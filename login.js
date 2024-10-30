// LINE LIFF 初始化和登入邏輯
const LIFF_ID = "2006514678-bXe3EKjm"; // 你的 LIFF ID

async function initializeLiff() {
    console.log("開始初始化 LIFF");
    try {
        console.log("正在初始化 LIFF...");
        await liff.init({ liffId: LIFF_ID });
        console.log("LIFF 初始化成功");
        
        // 檢查登入狀態
        const isLoggedIn = liff.isLoggedIn();
        console.log("登入狀態:", isLoggedIn);
        
        if (!isLoggedIn) {
            console.log("使用者未登入，準備執行登入");
            // 更新載入畫面訊息
            document.getElementById('loadingScreen').innerHTML = `
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p class="text-gray-600">準備登入 LINE...</p>
            `;
            // 直接觸發 LINE Login
            setTimeout(() => {
                console.log("執行 LINE 登入");
                liff.login();
            }, 1000);
        } else {
            console.log("使用者已登入，準備重定向");
            // 已登入，直接重定向到預約系統
            redirectToBookingSystem();
        }
    } catch (err) {
        console.error('LIFF 初始化失敗:', err);
        document.getElementById('loadingScreen').innerHTML = `
            <div class="text-red-600 mb-4">系統初始化失敗: ${err.message}</div>
            <button onclick="window.location.reload()" 
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                重試
            </button>
        `;
    }
}

function redirectToBookingSystem() {
    console.log("開始獲取使用者資料");
    document.getElementById('loadingScreen').innerHTML = `
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">正在讀取使用者資料...</p>
    `;
    
    liff.getProfile()
        .then(profile => {
            console.log("成功獲取使用者資料:", profile);
            const params = new URLSearchParams({
                userId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl || ''
            });
            console.log("準備重定向到預約系統");
            window.location.href = `booking.html?${params.toString()}`;
        })
        .catch(err => {
            console.error('獲取使用者資料失敗:', err);
            showError('無法獲取使用者資料: ' + err.message);
        });
}

function showError(message) {
    console.error('顯示錯誤:', message);
    document.getElementById('loadingScreen').innerHTML = `
        <div class="text-red-600 mb-4">${message}</div>
        <button onclick="window.location.reload()" 
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            重試
        </button>
    `;
}

// 監聽全域錯誤
window.addEventListener('error', function(event) {
    console.error('全域錯誤:', event.error);
});

console.log("準備初始化 LIFF");
// 頁面載入時初始化
window.addEventListener('load', initializeLiff);
