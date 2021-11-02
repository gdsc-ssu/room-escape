const $body = document.querySelector('body');
$body.innerHTML = `<div>새 탭에 힌트가 있습니다. 브라우저에 새 탭이 안생겼다면 팝업 차단을 해제하고 <span class="hint" onclick="window.open('https://balsamiq.com/support/faqs/browserconsole/', '_blank').focus()">여기</span>를 클릭하세요.</div>`;

window
  .open('https://balsamiq.com/support/faqs/browserconsole/', '_blank')
  .focus();
