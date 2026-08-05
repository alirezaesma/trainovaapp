<?php
http_response_code(500);
header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="utf-8">';
echo '<title>Trainova — خطا</title></head>';
echo '<body style="font-family:Tahoma,sans-serif;background:#08080a;color:#eff2f5;padding:40px;text-align:center">';
echo '<div style="max-width:500px;margin:40px auto;padding:32px;background:#141416;border-radius:16px">';
echo '<h1 style="color:#ff6b35">⚠ فایل index.html یافت نشد</h1>';
echo '<p>لطفاً مطمئن شوید که فایل index.html در ریشه public_html وجود دارد.</p>';
echo '</div></body></html>';
?>
