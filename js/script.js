// 共用 JavaScript 功能 - 適用於所有頁面

document.addEventListener('DOMContentLoaded', function() {
    console.log('網站載入完成');
    
    // 1. 手機菜單切換功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // 切換圖標
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 點擊選單連結後關閉菜單
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // 2. 預約表單處理
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        // 設置預約日期的最小值為今天
        const dateInput = bookingForm.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡單的表單驗證
            const name = bookingForm.querySelector('input[type="text"]').value;
            const phone = bookingForm.querySelector('input[type="tel"]').value;
            const service = bookingForm.querySelector('select').value;
            
            if (!name || !phone || !service) {
                alert('請填寫所有必填欄位！');
                return;
            }
            
            // 模擬提交成功
            alert(`預約成功！\n\n姓名：${name}\n電話：${phone}\n服務：${service}\n\n我們將在24小時內與您聯繫確認預約時間。`);
            bookingForm.reset();
            
            // 重置日期限制
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
        });
    }
    
    // 3. 聯絡表單處理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                alert('請填寫所有必填欄位！');
                return;
            }
            
            alert(`訊息已送出！\n\n感謝 ${name} 的留言。\n我們將盡快回覆您。`);
            contactForm.reset();
        });
    }
    
    // 4. 導航連結高亮當前頁面
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        // 移除路徑中的 ./ 再比較
        const cleanLinkHref = linkHref.replace('./', '');
        const cleanCurrentPage = currentPage.replace('./', '');
        
        if (cleanLinkHref === cleanCurrentPage || 
            (cleanCurrentPage === '' && cleanLinkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 5. 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是頁面內的錨點
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 6. 表單輸入自動驗證
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        control.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });
});
