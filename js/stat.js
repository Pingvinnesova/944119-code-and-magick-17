'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FONT = '16px PT Mono';
var TEXT_BASELINE = 'hanging';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INNER_GAP = 20;
var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderGreeting = function (ctx, text, x, y, color, font, baseline) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderGreeting(ctx, 'Ура вы победили!', CLOUD_X + INNER_GAP, CLOUD_Y + INNER_GAP, '#000', FONT, TEXT_BASELINE);
  renderGreeting(ctx, 'Список результатов:', CLOUD_X + INNER_GAP, (CLOUD_Y + INNER_GAP) + TEXT_HEIGHT, '#000', FONT, TEXT_BASELINE);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 3 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + TEXT_HEIGHT * 2 + GAP * 2 + (MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillStyle = 'rgba(18, 0, 255, ' + (i + 7) / 10 + ')';

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(CLOUD_X + GAP * 3 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + TEXT_HEIGHT * 3 + GAP * 3 + (MAX_BAR_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (MAX_BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP * 3 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + GAP + TEXT_HEIGHT * 3 + GAP * 2 + MAX_BAR_HEIGHT + GAP + GAP);
  }
};

