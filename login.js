// LINE LIFF 初始化和登入邏輯
const LIFF_ID = "2006514678-bXe3EKjm"; // 替換成你的 LIFF ID

async function initializeLiff() {
    try {
        await liff.init({ liffId: LIFF_ID });
        
        if (!liff.isLoggedIn()) {
            // 直接觸發 LINE Login
            liff.login();
        } else {
            // 已登入，直接重定向到預約系統
            redirectToBookingSystem();
        }
    } catch (err) {
        console.error('LIFF 初始化失敗:', err);
        document.getElementById('loadingScreen').innerHTML = `
            <div class="text-red-600 mb-4">系統初始化失敗</div>
            <button onclick="window.location.reload()" 
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                重試
            </button>
        `;
    }
}

function redirectToBookingSystem() {
    liff.getProfile()
        .then(profile => {
            const params = new URLSearchParams({
                userId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl || ''
            });
            window.location.href = `booking.html?${params.toString()}`;
        })
        .catch(err => {
            console.error('獲取使用者資料失敗:', err);
            showError('無法獲取使用者資料');
        });
}

function showError(message) {
    document.getElementById('loadingScreen').innerHTML = `
        <div class="text-red-600 mb-4">${message}</div>
        <button onclick="window.location.reload()" 
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            重試
        </button>
    `;
}

// 頁面載入時初始化
window.addEventListener('load', initializeLiff);
