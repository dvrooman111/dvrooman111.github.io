(function () {
    'use strict';
    var OPTIONS = [
      {category:'Engagement', key:'E', text:'Offer meaningful choices'},
      {category:'Engagement', key:'E', text:'Connect to career goals'},
      {category:'Engagement', key:'E', text:'Use real-world examples'},
      {category:'Engagement', key:'E', text:'Connect to prior experience'},
      {category:'Engagement', key:'E', text:'Set learning goals'},
      {category:'Engagement', key:'E', text:'Build in low-stakes practice'},
      {category:'Engagement', key:'E', text:'Invite student questions'},
      {category:'Engagement', key:'E', text:'Use authentic problems'},
      {category:'Engagement', key:'E', text:'Include peer collaboration'},
      {category:'Engagement', key:'E', text:'Provide optional challenges'},
      {category:'Engagement', key:'E', text:'Build in reflection'},
      {category:'Engagement', key:'E', text:'Show progress toward goals'},
      {category:'Engagement', key:'E', text:'Explain why it matters'},
      {category:'Engagement', key:'E', text:'Invite student feedback'},
      {category:'Engagement', key:'E', text:'Offer flexible pathways'},
      {category:'Representation', key:'R', text:'Provide a worked example'},
      {category:'Representation', key:'R', text:'Show an exemplar'},
      {category:'Representation', key:'R', text:'Chunk complex content'},
      {category:'Representation', key:'R', text:'Highlight key concepts'},
      {category:'Representation', key:'R', text:'Define key vocabulary'},
      {category:'Representation', key:'R', text:'Use a graphic organizer'},
      {category:'Representation', key:'R', text:'Caption videos'},
      {category:'Representation', key:'R', text:'Provide a transcript'},
      {category:'Representation', key:'R', text:'Pair text with visuals'},
      {category:'Representation', key:'R', text:'Provide multiple examples'},
      {category:'Representation', key:'R', text:'Connect to prior knowledge'},
      {category:'Representation', key:'R', text:'Explain it another way'},
      {category:'Representation', key:'R', text:'Provide guiding questions'},
      {category:'Representation', key:'R', text:'Model the thinking process'},
      {category:'Representation', key:'R', text:'Summarize key takeaways'},
      {category:'Action & Expression', key:'A', text:'Offer response format choices'},
      {category:'Action & Expression', key:'A', text:'Use a planning checklist'},
      {category:'Action & Expression', key:'A', text:'Provide assignment milestones'},
      {category:'Action & Expression', key:'A', text:'Use a grading rubric'},
      {category:'Action & Expression', key:'A', text:'Build in self-assessment'},
      {category:'Action & Expression', key:'A', text:'Build in peer feedback'},
      {category:'Action & Expression', key:'A', text:'Allow draft-and-revise'},
      {category:'Action & Expression', key:'A', text:'Offer formative feedback'},
      {category:'Action & Expression', key:'A', text:'Use progress checkpoints'},
      {category:'Action & Expression', key:'A', text:'Support project planning'},
      {category:'Action & Expression', key:'A', text:'Let students track progress'},
      {category:'Action & Expression', key:'A', text:'Provide multiple attempts'},
      {category:'Action & Expression', key:'A', text:'Offer presentation choices'},
      {category:'Action & Expression', key:'A', text:'Offer individual or collaborative options'},
      {category:'Action & Expression', key:'A', text:'Use Canvas progress tools'}
    ];

    var state = { remaining: [], called: [] };
    var el = {};

    function byId(id) { return document.getElementById(id); }
    function shuffle(list) {
      var a = list.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function categoryClass(item) {
      return item.key === 'E' ? 'engagement' : (item.key === 'R' ? 'representation' : 'action');
    }
    function setCurrent(item) {
      el.currentCategory.className = 'current-category';
      if (!item) {
        el.currentCategory.textContent = 'Ready';
        el.currentOption.textContent = 'Your first UDL strategy will appear here.';
      } else {
        el.currentCategory.textContent = item.category;
        el.currentCategory.classList.add(categoryClass(item));
        el.currentOption.textContent = item.text;
      }
    }
    function updateStats() {
      el.calledCount.textContent = String(state.called.length);
      el.remainingCount.textContent = String(state.remaining.length);
      el.undoButton.disabled = state.called.length === 0;
      el.drawButton.disabled = state.remaining.length === 0;
    }
    function renderHistory() {
      el.historyBoard.innerHTML = '';
      if (!state.called.length) {
        var empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'No strategies have been called yet.';
        el.historyBoard.appendChild(empty);
        return;
      }
      for (var i = 0; i < state.called.length; i++) {
        var item = state.called[i];
        var card = document.createElement('article');
        card.className = 'history-card ' + categoryClass(item);
        var content = document.createElement('div');
        var category = document.createElement('div');
        category.className = 'history-category ' + categoryClass(item);
        category.textContent = item.category;
        var text = document.createElement('div');
        text.className = 'history-option';
        text.textContent = item.text;
        content.appendChild(category);
        content.appendChild(text);
        card.appendChild(content);
        el.historyBoard.appendChild(card);
      }
    }
    function newGame() {
      state.remaining = shuffle(OPTIONS);
      state.called = [];
      setCurrent(null);
      renderHistory();
      updateStats();
    }
    function drawNext() {
      if (!state.remaining.length) {
        el.currentCategory.textContent = 'All strategies called';
        el.currentOption.textContent = 'Start a new game to call the strategies again.';
        updateStats();
        return;
      }
      var item = state.remaining.pop();
      state.called.push(item);
      setCurrent(item);
      renderHistory();
      updateStats();
    }
    function undoLast() {
      if (!state.called.length) return;
      var item = state.called.pop();
      state.remaining.push(item);
      setCurrent(state.called.length ? state.called[state.called.length - 1] : null);
      renderHistory();
      updateStats();
    }
    function init() {
      el.drawButton = byId('drawButton');
      el.undoButton = byId('undoButton');
      el.newGameButton = byId('newGameButton');
      el.currentCategory = byId('currentCategory');
      el.currentOption = byId('currentOption');
      el.calledCount = byId('calledCount');
      el.remainingCount = byId('remainingCount');
      el.historyBoard = byId('historyBoard');
      el.drawButton.addEventListener('click', drawNext);
      el.undoButton.addEventListener('click', undoLast);
      el.newGameButton.addEventListener('click', newGame);
      document.addEventListener('keydown', function (event) {
        if (event.code === 'Space' && document.activeElement.tagName !== 'BUTTON') {
          event.preventDefault();
          drawNext();
        }
      });
      newGame();
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }());
