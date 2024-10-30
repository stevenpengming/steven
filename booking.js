// 預約系統相關功能
const LIFF_ID = "2006514678-bXe3EKjm"; // 確保與 login.js 使用相同的 LIFF ID

async function initializeBookingSystem() {
    try {
        await liff.init({ liffId: LIFF_ID });
        
        if (!liff.isLoggedIn()) {
            // 如果未登入，重定向到登入頁面
            window.location.href = 'index.html';
            return;
        }

        // 填充用戶資料
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('userName').textContent = urlParams.get('displayName');
        document.getElementById('nameInput').value = urlParams.get('displayName');
        
        const pictureUrl = urlParams.get('pictureUrl');
        document.getElementById('userPicture').src = pictureUrl || '/api/placeholder/32/32';
    } catch (err) {
        console.error('LIFF 初始化失敗:', err);
        alert('系統初始化失敗，請重新登入');
        window.location.href = 'index.html';
    }
}

// 登出功能
function logout() {
    liff.logout();
    window.location.href = 'index.html';
}

// 表單提交處理
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        // 這裡可以添加表單資料的處理邏輯
        const formData = new FormData(this);
        // 可以在這裡添加資料驗證和發送到後端的邏輯
        
        alert('預約已送出！我們將盡快與您聯繫確認。');
    } catch (error) {
        console.error('表單提交失敗:', error);
        alert('預約送出失敗，請稍後再試。');
    }
});

// 初始化頁面
window.addEventListener('load', initializeBookingSystem);
