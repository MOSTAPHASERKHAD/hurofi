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

// 5. بناء ملف APK
console.log("\n⚙️  بناء ملف APK (جاري استخدام Java الخاص بـ Android Studio)...");
try {
  // استخدام الجافا المرفقة مع أندرويد ستوديو
  execSync(
    `$env:JAVA_HOME = "C:\\Program Files\\Android\\Android Studio\\jbr"; cd android; ./gradlew assembleRelease`,
    { cwd: root, stdio: "inherit", shell: "powershell.exe" }
  );
  
  // نقل الملف لسطح المكتب وإعادة تسميته
  console.log("\n🚚 نقل الملف إلى سطح المكتب...");
  execSync(
    `Copy-Item -Force "android\\app\\build\\outputs\\apk\\release\\app-release.apk" -Destination "$([Environment]::GetFolderPath('Desktop'))\\app-release.apk"`,
    { cwd: root, stdio: "inherit", shell: "powershell.exe" }
  );
  console.log("✅ تم تجهيز ملف app-release.apk على سطح المكتب");
} catch (e) {
  console.error("❌ حدث خطأ أثناء بناء الـ APK. يمكنك بناؤه من Android Studio يدوياً.");
}

// 6. رفع على GitHub
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

// 7. فتح صفحة جيتهاب تلقائياً
console.log("\n🌐 جاري فتح صفحة إضافة التحديث في جيتهاب...");
try {
  const url = `https://github.com/MOSTAPHASERKHAD/hurofi/releases/new?tag=v${newVersion}&title=%D8%AA%D8%AD%D8%AF%D9%8A%D8%AB+${newVersion}&body=${encodeURIComponent(releaseNotes)}`;
  execSync(`Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "start", "${url}"`, { cwd: root, shell: "powershell.exe" });
} catch (e) {
  // تجاهل إذا لم يفتح المتصفح
}

console.log(`
╔════════════════════════════════════════╗
║   ✅ تم تجهيز التحديث ${newVersion} بنجاح!   ║
╠════════════════════════════════════════╣
║                                        ║
║  تم رفع التغييرات إلى GitHub!          ║
║  وملف التحديث موجود على سطح مكتبك      ║
║  باسم: app-release.apk                 ║
║                                        ║
║  الخطوة الأخيرة:                       ║
║  ستُفتح الآن صفحة جيتهاب تلقائياً،     ║
║  كل ما عليك هو سحب الملف من سطح المكتب ║
║  وإفلاته في الصفحة ثم الضغط على:       ║
║  Publish release                       ║
╚════════════════════════════════════════╝
`);
