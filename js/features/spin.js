export function spin(ctx) {
  const items = ctx.state.items;
  if (!items.length) return;

  const picked = items[
    Math.floor(Math.random() * items.length)
  ];

  ctx.setState({ selected: picked });

  ctx.boot();
}
