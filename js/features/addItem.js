export function addItem(text, ctx) {
  if (!text) return;

  const newItem = {
    id: Date.now(),
    text
  };

  ctx.setState({
    items: [...ctx.state.items, newItem]
  });

  ctx.boot();
}
