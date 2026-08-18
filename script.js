(function () {
  'use strict';

  const CATEGORY_META = {
    E: {
      name: 'Engagement',
      label: 'WHY',
      cssClass: 'engagement',
      options: [
        'Offer meaningful choices',
        'Connect to career goals',
        'Use real-world examples',
        'Connect to prior experience',
        'Set learning goals',
        'Build in low-stakes practice',
        'Invite student questions',
        'Use authentic problems',
        'Include peer collaboration',
        'Provide optional challenges',
        'Build in reflection',
        'Show progress toward goals',
        'Explain why it matters',
        'Invite student feedback',
        'Offer flexible pathways'
      ]
    },
    R: {
      name: 'Representation',
      label: 'WHAT',
      cssClass: 'representation',
      options: [
        'Provide a worked example',
        'Show an exemplar',
        'Chunk complex content',
        'Highlight key concepts',
        'Define key vocabulary',
        'Use a graphic organizer',
        'Caption videos',
        'Provide a transcript',
        'Pair text with visuals',
        'Provide multiple examples',
        'Connect to prior knowledge',
        'Explain a concept another way',
        'Provide guiding questions',
        'Model the thinking process',
        'Summarize key takeaways'
      ]
    },
    A: {
      name: 'Action & Expression',
      label: 'HOW',
      cssClass: 'action',
      options: [
        'Offer response format choices',
        'Allow a recorded response',
        'Allow a written response',
        'Allow an oral response',
        'Use a planning checklist',
        'Provide assignment milestones',
        'Provide a model or exemplar',
        'Use a grading rubric',
        'Build in self-assessment',
        'Build in peer feedback',
        'Allow draft-and-revise',
        'Offer formative feedback',
        'Use progress checkpoints',
        'Support project planning',
        'Let students track progress'
      ]
    }
  };

  const allOptions = Object.entries(CATEGORY_META).flatMap(([prefix, category]) =>
    category.options.map((text, index) => ({
      id: `${prefix} ${String(index + 1).padStart(2, '0')}`,
      prefix,
      text,
      category: category.name,
      label: category.label,
      cssClass: category.cssClass
    }))
  );

  let deck = [];
  let called = [];

  function byId(id) {
    return document.getElementById(id);
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function startNewGame() {
    deck = shuffle(allOptions);
    called = [];
    render();
  }

  function drawNext() {
    if (deck.length === 0) return;
    called.push(deck.pop());
    render();
  }

  function undoLast() {
    if (called.length === 0) return;
    const last = called.pop();
    deck.push(last);
    deck = shuffle(deck);
    render();
  }

  function renderCurrent() {
    const currentCall = byId('currentCall');
    const currentCode = byId('currentCode');
    const currentText = byId('currentText');
    const statusHeading = byId('statusHeading');
    const last = called[called.length - 1];

    if (!last) {
      currentCall.className = 'current-call empty';
      currentCode.textContent = 'READY';
      currentText.textContent = 'Select “Draw Next” to begin.';
      statusHeading.textContent = 'Ready to play';
      return;
    }

    currentCall.className = `current-call ${last.cssClass}`;
    currentCode.textContent = last.id;
    currentText.textContent = last.text;
    statusHeading.textContent = `${last.category} — ${last.label}`;
  }

  function renderCounts() {
    const drawBtn = byId('drawBtn');
    const undoBtn = byId('undoBtn');
    byId('calledCount').textContent = called.length;
    byId('totalCount').textContent = allOptions.length;
    byId('remainingCount').textContent = deck.length;
    undoBtn.disabled = called.length === 0;
    drawBtn.disabled = deck.length === 0;
    drawBtn.textContent = deck.length === 0 ? 'All Options Called' : 'Draw Next';
  }

  function renderCalledBoard() {
    const board = byId('calledBoard');

    if (called.length === 0) {
      board.innerHTML = '<div class="empty-board">No options have been called yet.</div>';
      return;
    }

    const fragment = document.createDocumentFragment();
    called.slice().reverse().forEach((item) => {
      const card = document.createElement('article');
      card.className = `called-card ${item.cssClass}`;

      const code = document.createElement('div');
      code.className = 'called-code';
      code.textContent = item.id;

      const category = document.createElement('div');
      category.className = 'called-category';
      category.textContent = item.category;

      const text = document.createElement('div');
      text.className = 'called-text';
      text.textContent = item.text;

      card.append(code, category, text);
      fragment.appendChild(card);
    });

    board.replaceChildren(fragment);
  }

  function render() {
    renderCurrent();
    renderCounts();
    renderCalledBoard();
  }

  function init() {
    const drawBtn = byId('drawBtn');
    const undoBtn = byId('undoBtn');
    const newGameBtn = byId('newGameBtn');

    if (!drawBtn || !undoBtn || !newGameBtn) {
      console.error('UDL Bingo Caller: required controls were not found.');
      return;
    }

    drawBtn.addEventListener('click', drawNext);
    undoBtn.addEventListener('click', undoLast);
    newGameBtn.addEventListener('click', () => {
      const shouldReset = called.length === 0 || window.confirm('Start a new game and clear all called options?');
      if (shouldReset) startNewGame();
    });

    document.addEventListener('keydown', (event) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);

      if (event.code === 'Space' && !event.repeat && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        drawNext();
      }
    });

    startNewGame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
