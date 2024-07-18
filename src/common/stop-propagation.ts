type ReactEvent =
  | React.DragEvent
  | React.FormEvent
  | React.FocusEvent
  | React.MouseEvent
  | React.TouchEvent
  | React.WheelEvent
  | React.ChangeEvent
  | React.InvalidEvent
  | React.PointerEvent
  | React.KeyboardEvent
  | React.UIEvent
  | React.AnimationEvent
  | React.ClipboardEvent
  | React.SyntheticEvent
  | React.TransitionEvent
  | React.CompositionEvent
  | React.BaseSyntheticEvent;

export function stopPropagation(event: ReactEvent) {
  event.stopPropagation();
}
