(function () {
  'use strict';

  const OPTIONS = [
    // Engagement (E)
    { code: 'E 01', category: 'Engagement', shortCategory: 'E', text: 'Offer meaningful choices' },
    { code: 'E 02', category: 'Engagement', shortCategory: 'E', text: 'Connect to career goals' },
    { code: 'E 03', category: 'Engagement', shortCategory: 'E', text: 'Use real-world examples' },
    { code: 'E 04', category: 'Engagement', shortCategory: 'E', text: 'Connect to prior experience' },
    { code: 'E 05', category: 'Engagement', shortCategory: 'E', text: 'Set learning goals' },
    { code: 'E 06', category: 'Engagement', shortCategory: 'E', text: 'Build in low-stakes practice' },
    { code: 'E 07', category: 'Engagement', shortCategory: 'E', text: 'Invite student questions' },
    { code: 'E 08', category: 'Engagement', shortCategory: 'E', text: 'Use authentic problems' },
    { code: 'E 09', category: 'Engagement', shortCategory: 'E', text: 'Include peer collaboration' },
    { code: 'E 10', category: 'Engagement', shortCategory: 'E', text: 'Provide optional challenges' },
    { code: 'E 11', category: 'Engagement', shortCategory: 'E', text: 'Build in reflection' },
    { code: 'E 12', category: 'Engagement', shortCategory: 'E', text: 'Show progress toward goals' },
    { code: 'E 13', category: 'Engagement', shortCategory: 'E', text: 'Explain why it matters' },
    { code: 'E 14', category: 'Engagement', shortCategory: 'E', text: 'Invite student feedback' },
    { code: 'E 15', category: 'Engagement', shortCategory: 'E', text: 'Offer flexible pathways' },

    // Representation (R)
    { code: 'R 01', category: 'Representation', shortCategory: 'R', text: 'Provide a worked example' },
    { code: 'R 02', category: 'Representation', shortCategory: 'R', text: 'Show an exemplar' },
    { code: 'R 03', category: 'Representation', shortCategory: 'R', text: 'Chunk complex content' },
    { code: 'R 04', category: 'Representation', shortCategory: 'R', text: 'Highlight key concepts' },
    { code: 'R 05', category: 'Representation', shortCategory: 'R', text: 'Define key vocabulary' },
    { code: 'R 06', category: 'Representation', shortCategory: 'R', text: 'Use a graphic organizer' },
    { code: 'R 07', category: 'Representation', shortCategory: 'R', text: 'Caption videos' },
    { code: 'R 08', category: 'Representation', shortCategory: 'R', text: 'Provide a transcript' },
    { code: 'R 09', category: 'Representation', shortCategory: 'R', text: 'Pair text with visuals' },
    { code: 'R 10', category: 'Representation', shortCategory: 'R', text: 'Provide multiple examples' },
    { code: 'R 11', category: 'Representation', shortCategory: 'R', text: 'Connect to prior knowledge' },
    { code: 'R 12', category: 'Representation', shortCategory: 'R', text: 'Explain it another way' },
    { code: 'R 13', category: 'Representation', shortCategory: 'R', text: 'Provide guiding questions' },
    { code: 'R 14', category: 'Representation', shortCategory: 'R', text: 'Model the thinking process' },
    { code: 'R 15', category: 'Representation', shortCategory: 'R', text: 'Summarize key takeaways' },

    // Action & Expression (A)
    { code: 'A 01', category: 'Action & Expression', shortCategory: 'A', text: 'Offer response format choices' },
    { code: 'A 02', category: 'Action & Expression', shortCategory: 'A', text: 'Use a planning checklist' },
    { code: 'A 03', category: 'Action & Expression', shortCategory: 'A', text: 'Provide assignment milestones' },
    { code: 'A 04', category: 'Action & Expression', shortCategory: 'A', text: 'Use a grading rubric' },
    { code: 'A 05', category: 'Action & Expression', shortCategory: 'A', text: 'Build in self-assessment' },
    { code: 'A 06', category: 'Action & Expression', shortCategory: 'A', text: 'Build in peer feedback' },
    { code: 'A 07', category: 'Action & Expression', shortCategory: 'A', text: 'Allow draft-and-revise' },
    { code: 'A 08', category: 'Action & Expression', shortCategory: 'A', text: 'Offer formative feedback' },
    { code: 'A 09', category: 'Action & Expression', shortCategory: 'A', text: 'Use progress checkpoints' },
    { code: 'A 10', category: 'Action & Expression', shortCategory: 'A', text: 'Support project planning' },
    { code: 'A 11', category: 'Action & Expression', shortCategory: 'A', text: 'Let students track progress' },
    { code: 'A 12', category: 'Action & Expression', shortCategory: 'A', text: 'Provide multiple attempts' },
    { code: 'A 13', category: 'Action & Expression', shortCategory: 'A', text: 'Offer presentation choices' },
    { code: 'A 14', category: 'Action & Expression', shortCategory: 'A', text: 'Offer individual or collaborative options' },
    { code: 'A 15', category: 'Action & Expression', shortCategory: 'A', text: 'Use Canvas progress tools' }
  ];

  const state = {
    remaining: [],
    called: [],
  };

  const elements = {};

  function getElements() {
    elements.drawButton = document.getElementById('drawButton');
    elements.undoButton = document.getElementById('undoButton');
    elements.newGameButton = document.getElementById('newGameButton');
    elements.currentCode = document.getElementById('currentCode');
    elements.currentCategory = document.getElementById('currentCategory');
    elements.currentOption = document.getElementById('currentOption');
    elements.calledCount = document.getElementById('calledCount');
    elements.remainingCount = document.getElementById('remainingCount');
    elements.historyBoard = document.getElementById('historyBoard');
    elements.emptyState = document.getElementById('emptyState');
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function categoryClass(option) {
    if (option.shortCategory === 'E') return 'engagement';
    if (option.shortCategory === 'R') return 'representation';
    return 'action';
  }

  function startNewGame() {
    state.remaining = shuffle(OPTIONS);
    state.called = [];

    elements.currentCode.textContent = 'READY';
    elements.currentCategory.textContent = 'Click “Draw Next” to begin';
    elements.currentOption.textContent = 'Your first UDL strategy will appear here.';

    renderHistory();
    updateStats();
  }

  function drawNext() {
    if (state.remaining.length === 0) {
      elements.currentCode.textContent = 'DONE';
      elements.currentCategory.textContent = 'All 45 strategies have been called';
      elements.currentOption.textContent = 'Start a new game to call the strategies again.';
      updateStats();
      return;
    }

    const option = state.remaining.pop();
    state.called.push(option);

    elements.currentCode.textContent = option.code;
    elements.currentCategory.textContent = option.category;
    elements.currentOption.textContent = option.text;

    renderHistory();
    updateStats();
  }

  function undoLast() {
    if (state.called.length === 0) return;

    const option = state.called.pop();
    state.remaining.push(option);

    const last = state.called[state.called.length - 1];
    if (last) {
      elements.currentCode.textContent = last.code;
      elements.currentCategory.textContent = last.category;
      elements.currentOption.textContent = last.text;
    } else {
      elements.currentCode.textContent = 'READY';
      elements.currentCategory.textContent = 'Click “Draw Next” to begin';
      elements.currentOption.textContent = 'Your first UDL strategy will appear here.';
    }

    renderHistory();
    updateStats();
  }

  function updateStats() {
    elements.calledCount.textContent = String(state.called.length);
    elements.remainingCount.textContent = String(state.remaining.length);
    elements.undoButton.disabled = state.called.length === 0;
    elements.drawButton.disabled = state.remaining.length === 0;
  }

  function renderHistory() {
    elements.historyBoard.innerHTML = '';

    if (state.called.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No strategies have been called yet.';
      elements.historyBoard.appendChild(empty);
      return;
    }

    state.called.forEach(function (option, index) {
      const card = document.createElement('article');
      card.className = 'history-card';
      card.setAttribute('aria-label', 'Call ' + (index + 1) + ': ' + option.code + ', ' + option.text);

      const code = document.createElement('div');
      code.className = 'history-code ' + categoryClass(option);
      code.textContent = option.code;

      const content = document.createElement('div');

      const category = document.createElement('div');
      category.className = 'history-category';
      category.textContent = option.category;

      const text = document.createElement('div');
      text.className = 'history-option';
      text.textContent = option.text;

      content.appendChild(category);
      content.appendChild(text);
      card.appendChild(code);
      card.appendChild(content);
      elements.historyBoard.appendChild(card);
    });
  }

  function handleKeydown(event) {
    if (event.code !== 'Space') return;

    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    event.preventDefault();
    drawNext();
  }

  function init() {
    getElements();

    if (!elements.drawButton || !elements.undoButton || !elements.newGameButton) {
      console.error('UDL Bingo Caller: required controls were not found.');
      return;
    }

    elements.drawButton.addEventListener('click', drawNext);
    elements.undoButton.addEventListener('click', undoLast);
    elements.newGameButton.addEventListener('click', startNewGame);
    document.addEventListener('keydown', handleKeydown);

    startNewGame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
