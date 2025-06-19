// script.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generatePromptBtn');
    const copyBtn = document.getElementById('copyPromptBtn');
    const generatedPromptOutput = document.getElementById('generatedPrompt');
    const resultBox = document.querySelector('.result-box');
    const copyMessage = document.getElementById('copyMessage');

    generateBtn.addEventListener('click', () => {
        // 필수 입력 필드
        const appPurpose = document.getElementById('appPurpose').value.trim();
        const valueProposition = document.getElementById('valueProposition').value.trim();
        const mainFeaturesInput = document.getElementById('mainFeatures').value.trim();

        // 선택 입력 필드
        let targetPersona = document.getElementById('targetPersona').value.trim();
        let techStackPreference = document.getElementById('techStackPreference').value.trim();
        let aiIntegrationDetails = document.getElementById('aiIntegrationDetails').value.trim();
        let dataModel = document.getElementById('dataModel').value.trim();
        let apiIntegration = document.getElementById('apiIntegration').value.trim();
        let scalability = document.getElementById('scalability').value.trim();
        let securityPrivacy = document.getElementById('securityPrivacy').value.trim();
        let monitoringPerformance = document.getElementById('monitoringPerformance').value.trim();
        let benchmarkingApps = document.getElementById('benchmarkingApps').value.trim();

        // 필수 필드 유효성 검사
        if (!appPurpose || !valueProposition || !mainFeaturesInput) {
            alert('앱의 가장 큰 아이디어, 특별한 장점, 꼭 있었으면 하는 기능은 반드시 입력해야 합니다.');
            return;
        }

        const mainFeatures = mainFeaturesInput.split(',').map(feature => feature.trim()).filter(feature => feature !== '');

        // 선택 필드 기본값 설정 (비어있거나 '모름'일 경우)
        targetPersona = targetPersona || '특별히 정해진 사용자는 없습니다. 다양한 사람들이 사용할 수 있게 해주세요.';
        techStackPreference = techStackPreference || '어떤 기술을 사용해야 할지 잘 모릅니다. AI가 앱에 가장 적합한 기술을 추천해주세요.';
        aiIntegrationDetails = aiIntegrationDetails || 'AI가 앱 안에서 어떤 똑똑한 일을 해주면 좋을지 AI가 직접 아이디어를 내주세요.';
        dataModel = dataModel || '앱에 필요한 정보들은 AI가 기능에 맞춰서 잘 정리해주시면 됩니다.';
        apiIntegration = apiIntegration || '지금 당장은 다른 서비스와 연결할 필요는 없습니다.';
        scalability = scalability || '기본적으로 많은 사람들이 사용할 수 있고, 나중에 기능 추가가 쉬우면 좋겠습니다.';
        securityPrivacy = securityPrivacy || '내 개인 정보와 앱의 중요한 정보들이 안전하게 보호되면 좋겠습니다.';
        monitoringPerformance = monitoringPerformance || '앱이 잘 작동하는지, 문제가 생기면 알려주는 기본적인 기능이 있었으면 좋겠습니다.';
        benchmarkingApps = benchmarkingApps || '딱히 참고할 만한 앱이나 디자인은 없습니다.';


        const prompt = `
## **AI 기반 앱 개발 요청: ${appPurpose}**

---

### **1. 이 앱의 가장 큰 아이디어와 목적은 무엇인가요?**
- ${appPurpose} 앱을 만들고 싶습니다.

### **2. 이 앱을 사용하면 사람들이 어떤 점이 가장 좋아질까요? (이 앱만의 특별한 장점)**
- 이 앱은 사용자에게 다음과 같은 특별한 도움을 줄 것입니다:
  - ${valueProposition}

### **3. 앱에서 꼭 있었으면 하는 주요 기능들을 알려주세요.**
이 앱에는 다음 기능들이 반드시 포함되어야 합니다:
${mainFeatures.length > 0 ? '- ' + mainFeatures.join('\\n- ') : '- (기능 없음)'}

### **4. 이 앱은 주로 어떤 사람들이 사용하게 될까요? (사용자 설명)**
앱의 주요 사용자는 다음과 같습니다:
- ${targetPersona}
이 사용자들이 앱을 편리하게 이용할 수 있도록 잘 맞춰서 만들어주세요.

### **5. 혹시 앱을 만들 때 사용하고 싶은 기술이나 도구가 있나요? (기술 스택 선호)**
기술적인 부분에 대한 저의 생각은 다음과 같습니다:
- ${techStackPreference}
만약 더 좋은 기술이나 방법이 있다면, AI의 의견을 적극적으로 반영해주세요.

### **6. AI가 앱 안에서 어떤 똑똑한 일을 해주면 좋겠나요? (AI 활용 구체화)**
AI가 앱 안에서 다음처럼 똑똑하게 움직여주면 좋겠습니다:
- ${aiIntegrationDetails}
각 기능에 AI를 어떻게 적용할지 구체적인 아이디어와 필요한 데이터는 무엇일지 알려주세요.

### **7. 앱에서 다루게 될 주요 정보들은 무엇인가요? (데이터 종류)**
이 앱에서 관리하게 될 주요 정보들은 다음과 같습니다:
- ${dataModel}
이 정보들을 어떻게 효율적으로 저장하고 관리할지 제안해주세요.

### **8. 다른 서비스랑 연결되어야 할까요? (외부 서비스 연동)**
다른 서비스와의 연결에 대한 내용은 다음과 같습니다:
- ${apiIntegration}
만약 연결이 필요하다면, 어떻게 연결할지 구체적인 방법을 알려주세요.

### **9. 나중에 앱을 더 많은 사람들이 쓰거나, 기능을 더 추가할 때 쉽게 할 수 있었으면 좋겠나요? (확장성 및 유지보수)**
미래를 위해 앱을 만들 때 다음을 고려해주시면 좋겠습니다:
- ${scalability}
나중에 앱을 고치거나 새로운 기능을 넣기 쉽게 만들어주세요.

### **10. 내 개인 정보나 앱의 중요한 정보들이 안전하게 보호되어야 할까요? (보안 및 개인정보 보호)**
앱의 보안과 개인 정보 보호에 대한 저의 요구사항은 다음과 같습니다:
- ${securityPrivacy}
사용자 데이터가 안전하게 지켜질 수 있도록 신경 써 주세요.

### **11. 앱이 잘 작동하는지, 느려지지는 않는지 계속 확인하고 싶나요? (모니터링 및 성능 관리)**
앱 운영과 관련하여 다음을 알고 싶습니다:
- ${monitoringPerformance}
앱이 잘 돌아가는지 쉽게 확인할 수 있는 방법들을 알려주세요.

### **12. 참고할 만한 비슷한 앱이나 디자인이 있나요? (벤치마킹)**
참고하고 싶은 앱이나 디자인이 있다면 다음과 같습니다:
- ${benchmarkingApps}
이 앱들의 좋은 점들을 우리 앱에 어떻게 적용할 수 있을지 아이디어를 주세요.

---

### **AI 개발자님께 드리는 최종 요청:**

위에서 설명드린 앱 아이디어를 바탕으로,
1.  **앱이 어떻게 만들어질지 큰 그림을 그려주세요**: 앱의 각 부분이 어떻게 연결되고 작동할지 쉽게 설명해주세요.
2.  **어떤 기술을 사용하는 것이 가장 좋을지 추천해주세요**: 앱을 만드는 데 필요한 기술(예: 아이폰/안드로이드 앱을 만들 때 쓰는 기술, AI를 작동시키는 기술 등)과 그 이유를 알려주세요.
3.  **앱 개발 예상 계획을 알려주세요**: 앱을 만드는 데 어떤 단계가 필요하고, 각 단계마다 얼마나 시간이 걸릴지 대략적으로 알려주세요.
4.  **주요 기능들을 어떻게 구현할지 자세히 설명해주세요**: 특히 AI가 들어가는 기능들은 AI가 어떻게 학습하고 작동할지 구체적으로 알려주세요.
5.  **앱을 만들면서 생길 수 있는 어려움과 해결 방법을 알려주세요**.
6.  **혹시 앱 개발에 어느 정도 비용이 들지 대략적으로 알려주실 수 있을까요? (선택 사항)**

이 모든 내용을 포함해서, 제가 이해하기 쉽도록 **종합적인 앱 개발 계획과 따라 할 수 있는 구체적인 가이드라인**을 제안해주시면 정말 큰 도움이 될 것입니다. 필요하다면 간단한 예시 코드나 그림으로 설명해주셔도 좋습니다!
        `.trim();

        generatedPromptOutput.textContent = prompt;
        resultBox.style.display = 'block';

        copyMessage.style.display = 'none';
        copyMessage.textContent = '';
    });

    copyBtn.addEventListener('click', () => {
        const textToCopy = generatedPromptOutput.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyMessage.textContent = '프롬프트가 클립보드에 복사되었습니다!';
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            copyMessage.textContent = '프롬프트 복사에 실패했습니다.';
            copyMessage.style.display = 'block';
        });
    });
});