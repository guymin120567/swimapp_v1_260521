export function selectItem(ctx, id) {
  const item = ctx.state.items.find(i => i.id === id);

  if (!item) return;

  ctx.setState({ selected: item });

  ctx.boot();
}
