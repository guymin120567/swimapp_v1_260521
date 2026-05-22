export function spin(ctx) {
  const items = ctx.state.items;
  if (!items.length) return;

  const prev = ctx.state.selected;

  // 직전 결과 제외 (단, 2개 이상일 때만)
  const pool =
    items.length > 1
      ? items.filter(i => i.id !== prev?.id)
      : items;

  const picked =
    pool[Math.floor(Math.random() * pool.length)];

  ctx.setState({ selected: picked });
  ctx.boot();
}
