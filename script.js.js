// النظام المحسن الكامل
document.addEventListener('DOMContentLoaded', function() {
    // إخفاء شاشة التحميل
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // إدارة الزوار والإحصائيات
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    let analysisCount = parseInt(localStorage.getItem('analysisCount')) || 0;
    
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount);
    
    updateStats();

    // أنواع التحليلات المحسّنة
    const analysisTypes = {
        vision: {
            title: "الرؤية الداخلية",
            icon: " fas fa-eye",
            descriptions: [
                "لقد اكتشفت جانبًا مخفيًا من شخصيتك لم تكن تتخيله...",
                "رؤية داخلية قوية تشير إلى وعي عالٍ ومتفوق...",
                "البصيرة التي لديك تفوق التوقعات العادية بمستوى كبير...",
                "لديك قدرة استثنائية على رؤية الحقائق الخفية...",
                "العمق البصيري لديك يفتح أبوابًا لا نهائية للفهم..."
            ],
            insights: [
                "تحليلك يشير إلى قدرة استباقية مميزة وفريدة",
                "نمط التفكير الخاص بك غير تقليدي ومبتكِر",
                "التطور المستقبلي يعتمد على الثقة بالنفس والجرأة",
                "الوعي العالي لديك يخلق فرصًا لا محدودة للنمو",
                "القدرة على التنبؤ تجعلك قائدًا طبيعيًا"
            ],
            color: "#3498db"
        },
        analysis: {
            title: "التحليل العميق",
            icon: "fas fa-brain",
            descriptions: [
                "تحليلك النفسي يشير إلى قوة داخلية غير متوقعة ومذهلة...",
                "العمق العاطفي الذي تمتلكه يستحق كل التقدير والاحترام...",
                "القدرة على فهم الذات تتطور بشكل متسارع ومثير...",
                "التحليل الدقيق يكشف عن طاقات خفية لم تكتشفها...",
                "الفهم العميق لنفسيتك يفتح آفاقًا جديدة للتطور..."
            ],
            insights: [
                "نمط التفكير الخاص بك فريد من نوعه ومتعدد الأبعاد",
                "التحديات الحالية فرص ذهبية للنمو الشخصي",
                "العلاقات الاجتماعية تؤثر بشكل كبير وعميق على تقدمك",
                "القدرة على التحليل تجعلك محصلًا متميزًا",
                "الفهم الذاتي يخلق توازنًا داخليًا قويًا"
            ],
            color: "#9b59b6"
        },
        healing: {
            title: "الشفاء النفسي",
            icon: "fas fa-heart",
            descriptions: [
                "عملية الشفاء بدأت، وستشعر بالتغيير تدريجيًا ومريح...",
                "الشفاء النفسي يسير في المسار الصحيح والمثالي...",
                "التحول الداخلي يحدث بشكل طبيعي ومريح جدًا...",
                "التعافي يسير بسرعة أكبر مما تتوقع...",
                "الشفاء يخلق قوة داخلية لا تُقهر..."
            ],
            insights: [
                "القوة الداخلية أكبر مما تتخيل وتفوق التوقعات",
                "الوقت المناسب للشفاء هو الآن والفرص مواتية",
                "التقدم المستمر يبشر بمستقبل أفضل وأكثر إشراقًا",
                "التعافي يخلق مرونة نفسية استثنائية",
                "الشفاء يفتح قلوبًا جديدة للحب والثقة"
            ],
            color: "#2ecc71"
        },
        revelation: {
            title: "الكشف الصادق",
            icon: "fas fa-crystal-ball",
            descriptions: [
                "الحقيقة التي كنت تبحث عنها هي: أنت أقوى مما تتخيل...",
                "الكشف الصادق يُظهر قدرات لم تكتشفها بعد...",
                "الحقيقة الداخلية تحررك من القيود الوهمية...",
                "الكشف يفتح أبوابًا جديدة للفهم الذاتي...",
                "الحقيقة التي تكتشفها الآن ستغير كل شيء..."
            ],
            insights: [
                "الحقيقة التي تكتشفها الآن ستغير كل شيء بشكل جذري",
                "الوعي الجديد يفتح أبوابًا لا نهائية للتطور",
                "التطور الشخصي في أوجة ويتقدم بسرعة",
                "الكشف يخلق وعيًا جديدًا بالذات والعالم",
                "الحقيقة تحرر الطاقات الخفية داخلك..."
            ],
            color: "#f39c12"
        }
    };

    // إضافة أحداث للبطاقات
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        const type = card.dataset.type;
        
        // تأثير عند مرور الماوس
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        // تأثير عند الضغط
        card.addEventListener('click', function() {
            showEnhancedAnalysis(type);
            // تحديث عدد التحليلات
            analysisCount++;
            localStorage.setItem('analysisCount', analysisCount);
            updateStats();
        });
    });

    // دالة إظهار التحليل المحسن
    function showEnhancedAnalysis(type) {
        const analysis = analysisTypes[type];
        if (!analysis) return;

        // اختيار عشوائي من الوصف والرؤية
        const randomDesc = analysis.descriptions[Math.floor(Math.random() * analysis.descriptions.length)];
        const randomInsight = analysis.insights[Math.floor(Math.random() * analysis.insights.length)];

        // تحديث محتوى النافذة
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = analysis.title;
        modalTitle.style.color = analysis.color;
        
        modalBody.innerHTML = `
            <div class="analysis-content">
                <div class="analysis-header" style="border-right-color: ${analysis.color};">
                    <div class="analysis-icon" style="color: ${analysis.color};">
                        <i class="${analysis.icon}"></i>
                    </div>
                    <h3>تحليلك الشخصي</h3>
                </div>
                
                <div class="analysis-description">
                    <p>${randomDesc}</p>
                </div>
                
                <div class="analysis-progress">
                    <div class="progress-bar" style="background: ${analysis.color};">
                        <div class="progress-fill" style="width: ${Math.floor(Math.random() * 40) + 60}%; background: ${analysis.color};"></div>
                    </div>
                </div>
                
                <div class="analysis-insight">
                    <div class="insight-header">
                        <i class="fas fa-lightbulb"></i>
                        <h4>رؤية AI</h4>
                    </div>
                    <p>${randomInsight}</p>
                </div>
                
                <div class="analysis-recommendations">
                    <div class="recommendations-header">
                        <i class="fas fa-star"></i>
                        <h4>توصيات للتطوير</h4>
                    </div>
                    <ul>
                        <li>مارس التأمل اليومي لمدة 10 دقائق</li>
                        <li>اكتب ملاحظاتك البصيرية يوميًا</li>
                        <li>شارك تجربتك مع شخص تثق به</li>
                        <li>تابع تطورك خلال الأسبوع القادم</li>
                    </ul>
                </div>
                
                <div class="analysis-timestamp">
                    <i class="fas fa-clock"></i>
                    <span>تم التحليل في: ${new Date().toLocaleDateString('ar-EG')} - ${new Date().toLocaleTimeString('ar-EG')}</span>
                </div>
            </div>
        `;

        // إظهار النافذة
        const modal = document.getElementById('analysisModal');
        modal.classList.add('active');

        // إضافة أحداث للأزرار
        document.getElementById('closeModal').addEventListener('click', closeAnalysisModal);
        document.getElementById('saveReportBtn').addEventListener('click', function() {
            saveAnalysisAsPDF(type, randomDesc, randomInsight);
        });
        document.getElementById('shareBtn').addEventListener('click', shareAnalysis);

        // إغلاق بالنقر على الخلفية
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAnalysisModal();
            }
        });
    }

    // دالة إغلاق النافذة
    function closeAnalysisModal() {
        const modal = document.getElementById('analysisModal');
        modal.classList.remove('active');
    }

    // دالة حفظ التحليل كـ PDF
    function saveAnalysisAsPDF(type, description, insight) {
        if (typeof jspdf === 'undefined') {
            alert('المكتبة المطلوبة لحفظ التقرير غير متوفرة حالياً');
            return;
        }

        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        
        // إعداد التقرير
        doc.setFontSize(18);
        doc.text('تقرير التحليل النفسي', 105, 20, { align: 'center' });
        
        doc.setFontSize(14);
        const analysisTitles = {
            vision: "الرؤية الداخلية",
            analysis: "التحليل العميق", 
            healing: "الشفاء النفسي",
            revelation: "الكشف الصادق"
        };
        doc.text(`نوع التحليل: ${analysisTitles[type]}`, 20, 40);
        
        const date = new Date().toLocaleDateString('ar-EG');
        doc.text(`التاريخ: ${date}`, 20, 50);
        
        doc.setFontSize(12);
        doc.text('التحليل:', 20, 70);
        const descLines = doc.splitTextToSize(description, 170);
        doc.text(descLines, 20, 80);
        
        let yPosition = 80 + (descLines.length * 7);
        doc.text('الرؤية:', 20, yPosition + 10);
        const insightLines = doc.splitTextToSize(insight, 170);
        doc.text(insightLines, 20, yPosition + 20);
        
        const pageInfo = doc.internal.getNumberOfPages();
        doc.text('تقرير مُولد آليًا من نظام التحليل النفسي', 105, 280, { align: 'center' });
        
        const filename = `تحليل_${analysisTitles[type]}_${date.replace(/\//g, '-')}.pdf`;
        doc.save(filename);
        
        // إظهار رسالة نجاح
        showNotification('تم حفظ التقرير بنجاح!', 'success');
    }

    // دالة مشاركة التحليل
    function shareAnalysis() {
        if (navigator.share) {
            navigator.share({
                title: 'تحليلي النفسي',
                text: 'اكتشفت شيئًا جديدًا عن نفسي! تحقق من التحليل النفسي.',
                url: window.location.href
            }).catch(console.error);
        } else {
            // نسخ الرابط للحافظة
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('تم نسخ الرابط للحافظة!', 'info');
            });
        }
    }

    // دالة إظهار الإشعارات
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // إضافة الأنميشن
        const style = document.createElement('style');
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                left: 20px;
                background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #3498db, #8e44ad)'};
                border-radius: 12px;
                padding: 15px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 3000;
                animation: slideInLeft 0.5s ease;
                max-width: 350px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .notification-content i {
                font-size: 20px;
            }
            
            .notification-content span {
                flex: 1;
                color: white;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: white;
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // إضافة حدث إغلاق
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
            style.remove();
        });

        // إزالة تلقائية بعد 3 ثواني
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                style.remove();
            }
        }, 3000);
    }

    // تحديث الإحصائيات
    function updateStats() {
        const visitorCountElement = document.getElementById('visitorCount');
        const analysisCountElement = document.getElementById('analysisCount');
        
        if (visitorCountElement) {
            visitorCountElement.textContent = visitorCount;
        }
        
        if (analysisCountElement) {
            analysisCountElement.textContent = analysisCount;
        }
    }

    // تأثيرات إضافية للعناصر
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.3); }
            50% { box-shadow: 0 0 30px rgba(52, 152, 219, 0.6); }
        }
        
        .section-card:hover {
            animation: glow 2s infinite;
        }
    `;
    document.head.appendChild(style);
});

// تحسين أداء الصفحة عند التحميل
window.addEventListener('load', function() {
    // تحسين الخطوط
    if ('fonts' in document) {
        document.fonts.ready.then(function() {
            // تحسين الأداء بعد تحميل الخطوط
            console.log('Fonts loaded successfully');
        });
    }
    
    // تحسين الصور (لو كانت موجودة)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});