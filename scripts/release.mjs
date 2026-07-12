#!/usr/bin/env node
/**
 * سكريبت نشر تحديث جديد
 * الاستخدام: node scripts/release.mjs 1.0.1 "وصف التحديث"
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const newVersion = process.argv[2];
const releaseNotes = process.argv[3] || "تحديثات وتحسينات عامة";

if (!newVersion) {
  console.error("❌ يجب تحديد رقم الإصدار. مثال: node scripts/release.mjs 1.0.1 'إصلاح مشاكل الصوت'");
  process.exit(1);
}

console.log(`\n🚀 بدء نشر الإصدار ${newVersion}...\n`);

// 1. تحديث version.json
const versionPath = join(root, "public", "version.json");
const versionData = {
  version: newVersion,
  releaseDate: new Date().toISOString().split("T")[0],
  notes: releaseNotes,
  minBuild: 1,
};
writeFileSync(versionPath, JSON.stringify(versionData, null, 2));
console.log(`✅ تم تحديث version.json إلى ${newVersion}`);

// 2. تحديث package.json
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
pkg.version = newVersion;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`✅ تم تحديث package.json`);

// 3. بناء التطبيق
console.log("\n📦 بناء التطبيق...");
execSync("npm run build", { cwd: root, stdio: "inherit" });
console.log("✅ اكتمل البناء");

// 4. مزامنة Capacitor
console.log("\n📱 مزامنة Capacitor...");
execSync("npx cap sync android", { cwd: root, stdio: "inherit" });
console.log("✅ اكتملت المزامنة");

// 5. رفع على GitHub
console.log("\n📤 رفع التغييرات على GitHub...");
execSync("git add -A", { cwd: root, stdio: "inherit" });
execSync(`git commit -m "🔖 release: v${newVersion} - ${releaseNotes}"`, {
  cwd: root,
  stdio: "inherit",
});
execSync("git push origin main", { cwd: root, stdio: "inherit" });
execSync(`git tag v${newVersion}`, { cwd: root, stdio: "inherit" });
execSync(`git push origin v${newVersion}`, { cwd: root, stdio: "inherit" });
console.log("✅ تم الرفع على GitHub");

console.log(`
╔════════════════════════════════════════╗
║   ✅ تم نشر الإصدار ${newVersion} بنجاح!     ║
╠════════════════════════════════════════╣
║                                        ║
║  التطبيقات القديمة ستتلقى إشعاراً      ║
║  بالتحديث عند فتح التطبيق              ║
║                                        ║
║  الخطوة التالية:                       ║
║  ابنِ APK جديد من Android Studio       ║
║  وارفعه على Amazon Appstore            ║
║                                        ║
╚════════════════════════════════════════╝
`);
