export function spin(ctx) {
  const items = ctx.state.items;
  if (!items.length) return;

  const prev = ctx.state.selected;

  // 1️⃣ 직전 결과 제외 (2개 이상일 때만)
  const pool =
    items.length > 1
      ? items.filter(i => i.id !== prev?.id)
      : items;

  // 2️⃣ 최종 픽
  const picked =
    pool[Math.floor(Math.random() * pool.length)];

  // 3️⃣ 상태 업데이트
  ctx.setState({ selected: picked });

  // 4️⃣ 렌더 타이밍 안정화 (중요)
  // 빠른 연속 클릭 / 렌더 꼬임 방지
  requestAnimationFrame(() => {
    ctx.boot();
  });
}