# 条款

<div class="terms-content" style="background-color: #f9f7ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
  <p>本店保证售卖的一切产品均为合法科研用化学品，仅供实验室科研工作使用，严禁食用、药用等一切除科研之外的用途。</p>
  
  <p>我们的产品均来自海外合法正规实验室，商品相关信息仅为客观陈述，均无任何引导暗示作用，还请用户购买前务必确认清楚。任何脱离科研的使用均非我们所支持，相关后果我们概不承担。</p>
  
  <p>我们的产品极具严谨性，根据资料与临床试验可知，此类化学品坚决不可与一切精神类药物同服，如SSRI类药物（右美沙芬、氟西汀、氟西汀、舍曲林、帕罗西汀、西酞普兰、艾司西酞普兰）与本品联用将会导致血清素综合征致死。除此之外，若您还有其他关于药物联用的问题，请咨询客服。</p>
  
  <p>另：此段提示仅为提醒用户本品的药理潜力与作用机制，而非一切暗示/引导！</p>
  
  <p>本店所述"模拟物""类似物""策划药"等字眼仅为效果参考，目的是为了使科研过程更加便利：如策划药兼氯胺酮类似物"月尘"是指月尘具有与氯胺酮类似的潜在药用价值，可供用户科研开发；而非其可以直接作为药物用于人体。本店不存在任何暗示性用语，一切描述均为客观陈述。再次重申：本店所售卖物质仅供科研用途使用，用户购买前还请明辨。</p>
  
  <p>现有反馈报告均为根据现有公开资料与第三方受试者所述整理而成的。我们的初衷仅为售卖稀有化学品辅助科研事业发展，严禁用户私自用于人体。任何脱离科研的使用均非我们所支持，相关后果我们概不承担。</p>
  
  <p>本店推荐的"使用方法"为理论上科研化学品作用于人体的方法，目的旨在理论上提示用户其潜在的吸收途径和效率，而非任何鼓励/暗示性行为。为了确保销售和科研过程合法、顺利，我们再次强调：请您反复、认真阅读用户须知。</p>
  
  <p>再次重申：本店所售卖一切物质仅限科研用途使用，我们对于科研之外的任何使用所产生的一切后果概不负责。</p>
</div>

<div class="terms-confirmation" style="text-align: center; margin: 30px 0;">
  <p style="font-weight: bold; color: #9f7aea;">如您同意本店售出产品后买家所造成的一切后果均由您自己承担，请点击下方按钮确认</p>
  
  <button id="terms-confirm-btn" style="
    background-color: #9f7aea;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  ">确认</button>
</div>

<script>
  // 添加确认按钮点击事件
  document.getElementById('terms-confirm-btn').addEventListener('click', function() {
    // 显示确认成功消息
    alert('确认成功！');
    
    // 可以添加更多逻辑，如设置本地存储记录用户已确认
    localStorage.setItem('termsConfirmed', 'true');
  });
</script>

<style>
  .terms-content {
    line-height: 1.8;
    color: #333;
  }
  
  .terms-content p {
    margin-bottom: 16px;
  }
  
  /* 深色模式适配 */
  .dark .terms-content {
    background-color: #1e293b;
    color: #e2e8f0;
  }
  
  .dark .terms-confirmation p {
    color: #a78bfa;
  }
  
  .dark #terms-confirm-btn {
    background-color: #7c3aed;
  }
</style>