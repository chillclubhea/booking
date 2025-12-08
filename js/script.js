// 共用 JavaScript 功能 - 適用於所有頁面

document.addEventListener('DOMContentLoaded', function() {
    console.log('網站載入完成 - NannasStudio 風格');
    
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
    
    // 2. 滾動動畫功能
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in, .service-card, .feature-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // 如果是服務卡片，添加延遲效果
                    if (entry.target.classList.contains('service-card')) {
                        const index = Array.from(fadeElements).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach((element, index) => {
            observer.observe(element);
        });
        
        // 導航列滾動效果
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.site-header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // 初始化滾動動畫
    initScrollAnimations();
    
    // 3. 預約表單處理
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
            
            // 動畫效果
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
            submitBtn.disabled = true;
            
            // 模擬提交過程
            setTimeout(() => {
                // 簡單的表單驗證
                const name = bookingForm.querySelector('input[type="text"]').value;
                const phone = bookingForm.querySelector('input[type="tel"]').value;
                const service = bookingForm.querySelector('select').value;
                
                if (!name || !phone || !service) {
                    alert('請填寫所有必填欄位！');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // 模擬提交成功
                alert(`🎉 預約成功！\n\n👤 姓名：${name}\n📞 電話：${phone}\n💆 服務：${service}\n\n我們將在24小時內與您聯繫確認預約時間。`);
                bookingForm.reset();
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 預約成功！';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
                
                // 重置日期限制
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.setAttribute('min', today);
                }
            }, 1000);
        });
    }
    
    // 4. 聯絡表單處理
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
            
            // 動畫效果
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 傳送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`✨ 訊息已送出！\n\n感謝 ${name} 的留言。\n我們將盡快回覆您。`);
                contactForm.reset();
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 已傳送！';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }
    
    // 5. 導航連結高亮當前頁面
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        const cleanLinkHref = linkHref ? linkHref.replace('./', '') : '';
        const cleanCurrentPage = currentPage.replace('./', '');
        
        if (cleanLinkHref === cleanCurrentPage || 
            (cleanCurrentPage === '' && cleanLinkHref === 'index.html') ||
            (cleanCurrentPage === 'index.html' && cleanLinkHref === '')) {
            link.classList.add('active');
        }
    });
    
    // 6. 平滑滾動到錨點
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
    
    // 7. 表單輸入自動驗證
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#E8E2D9';
                this.style.boxShadow = 'none';
            }
        });
        
        control.addEventListener('input', function() {
            this.style.borderColor = '#E8E2D9';
            this.style.boxShadow = 'none';
        });
    });
    
    // 8. 服務卡片點擊效果
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const serviceLink = this.querySelector('a.btn');
                if (serviceLink) {
                    serviceLink.click();
                }
            }
        });
    });
    
    // 9. 浮動動畫元素
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        // 隨機延遲
        const randomDelay = Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;
    });
    
    // 10. 圖片加載效果
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});
