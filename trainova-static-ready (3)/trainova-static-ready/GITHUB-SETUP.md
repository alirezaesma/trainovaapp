# 🚀 راهنمای اتصال به GitHub و GitHub Pages

## مراحل اتصال پروژه Trainova به گیت‌هاب

### 1️⃣ ساخت مخزن در GitHub
1. وارد حساب GitHub خود شوید
2. روی دکمه **New Repository** کلیک کنید
3. نام مخزن را وارد کنید (مثلاً `trainova-site`)
4. مخزن را **Public** یا **Private** انتخاب کنید
5. تیک **Initialize this repository with a README** را **نـزنید**
6. روی **Create repository** کلیک کنید

### 2️⃣ اتصال پروژه محلی به GitHub
دستورات زیر را در ترمینال اجرا کنید:

```bash
# تغییر مسیر به پوشه پروژه
cd "/workspace/trainova-static-ready (3)/trainova-static-ready"

# اضافه کردن remote (آدرس مخزن خود را جایگزین کنید)
git remote add origin https://github.com/USERNAME/trainova-site.git

# ارسال کدها به GitHub
git push -u origin main
```

> ⚠️ توجه: به جای `USERNAME` نام کاربری گیت‌هاب خود و به جای `trainova-site` نام مخزن خود را وارد کنید.

### 3️⃣ فعال‌سازی GitHub Pages
1. وارد مخزن خود در GitHub شوید
2. به تب **Settings** بروید
3. از منوی سمت چپ، روی **Pages** کلیک کنید
4. در بخش **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / **(root)**
5. روی **Save** کلیک کنید

بعد از چند دقیقه، سایت شما در آدرس زیر قابل دسترسی خواهد بود:
```
https://USERNAME.github.io/trainova-site/
```

---

## 🔄 آپدیت خودکار با هر تغییر

هر بار که تغییری در فایل‌ها ایجاد کردید، دستورات زیر را اجرا کنید:

```bash
# افزودن تغییرات
git add .

# ثبت تغییرات با پیام مناسب
git commit -m "توضیح تغییرات"

# ارسال به GitHub
git push origin main
```

GitHub Pages به‌طور خودکار بعد از هر push، سایت را آپدیت می‌کند (معمولاً ۱-۲ دقیقه طول می‌کشد).

---

## 🎯 نکات مهم

### ✅ بهترین روش‌ها
- همیشه قبل از push، تغییرات را بررسی کنید: `git status`
- از پیام‌های معنادار برای commit استفاده کنید
- نسخه `version.json` را با هر آپدیت بزرگ تغییر دهید

### 🔧 رفع مشکلات رایج

#### مشکل: خطای Authentication
```bash
# استفاده از token به جای رمز عبور
git remote set-url origin https://YOUR_TOKEN@github.com/USERNAME/trainova-site.git
```

#### مشکل: کش مرورگر
- کلیدهای `Ctrl + Shift + R` (ویندوز) یا `Cmd + Shift + R` (مک) را بزنید
- یا از حالت Incognito استفاده کنید

#### مشکل: آپدیت نشدن سایت
1. به Settings > Pages بروید
2. یک بار Branch را تغییر داده و دوباره برگردانید
3. صبر کنید (تا ۵ دقیقه)

---

## 📊 مشاهده وضعیت Deploy

بعد از هر push:
1. به تب **Actions** در مخزن بروید
2. وضعیت deploy را مشاهده کنید
3. اگر سبز شد، یعنی موفقیت‌آمیز بوده
4. اگر قرمز شد، روی آن کلیک کرده و علت خطا را ببینید

---

## 🌟 ویژگی‌های این نسخه (v10.2)

✅ صفحه Loading حرفه‌ای  
✅ صفحه Welcome جذاب  
✅ صفحه 404 سفارشی  
✅ SEO بهینه (sitemap.xml, robots.txt)  
✅ PWA با میانبرهای اپلیکیشن  
✅ طراحی کاملاً ریسپانسیو  
✅ انیمیشن‌های Smooth  

---

## 📞 پشتیبانی

در صورت بروز مشکل:
1. لاگ‌های GitHub Actions را بررسی کنید
2. کنسول مرورگر را چک کنید (F12)
3. فایل `version.json` را برای نسخه فعلی بررسی کنید

---

**تهیه شده توسط تیم Trainova**  
نسخه مستندات: 1.0  
آخرین به‌روزرسانی: 2025
