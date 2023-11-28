export interface TailwindStyledTheme {
  container: Container;
  screens: Screens;
  accentColor: AccentColor;
  animation: Animation;
  aria: Aria;
  aspectRatio: AspectRatio;
  backdropBlur: BackdropBlur;
  backdropBrightness: BackdropBrightness;
  backdropContrast: BackdropContrast;
  backdropGrayscale: BackdropGrayscale;
  backdropHueRotate: BackdropHueRotate;
  backdropInvert: BackdropGrayscale;
  backdropOpacity: BackdropOpacity;
  backdropSaturate: BackdropSaturate;
  backdropSepia: BackdropGrayscale;
  backgroundColor: BackgroundColor;
  backgroundImage: BackgroundImage;
  backgroundOpacity: BackdropOpacity;
  backgroundPosition: BackgroundPosition;
  backgroundSize: BackgroundSize;
  blur: BackdropBlur;
  borderColor: BorderColor;
  borderOpacity: BackdropOpacity;
  borderRadius: BorderRadius;
  borderSpacing: Spacing;
  borderWidth: BorderWidth;
  boxShadow: BoxShadow;
  boxShadowColor: BackgroundColor;
  brightness: BackdropBrightness;
  caretColor: BackgroundColor;
  colors: BackgroundColor;
  columns: Columns;
  content: Content;
  contrast: BackdropContrast;
  cursor: Cursor;
  divideColor: BorderColor;
  divideOpacity: BackdropOpacity;
  divideWidth: BorderWidth;
  dropShadow: DropShadow;
  fill: Fill;
  flex: Flex;
  flexBasis: FlexBasis;
  flexGrow: BackdropGrayscale;
  flexShrink: BackdropGrayscale;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  gap: Spacing;
  gradientColorStops: BackgroundColor;
  gradientColorStopPositions: GradientColorStopPositions;
  grayscale: BackdropGrayscale;
  gridAutoColumns: GridAutoColumns;
  gridAutoRows: GridAutoColumns;
  gridColumn: GridColumn;
  gridColumnEnd: GridColumnEnd;
  gridColumnStart: GridColumnEnd;
  gridRow: GridRow;
  gridRowEnd: GridRowEnd;
  gridRowStart: GridRowEnd;
  gridTemplateColumns: GridTemplateColumns;
  gridTemplateRows: GridTemplateRows;
  height: Height;
  hueRotate: BackdropHueRotate;
  inset: Inset;
  invert: BackdropGrayscale;
  keyframes: Keyframes;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  listStyleType: ListStyleType;
  listStyleImage: Content;
  margin: Margin;
  lineClamp: LineClamp;
  maxHeight: MaxHeight;
  maxWidth: MaxWidth;
  minHeight: MinHeight;
  minWidth: MinWidth;
  objectPosition: BackgroundPosition;
  opacity: BackdropOpacity;
  order: Order;
  outlineColor: BackgroundColor;
  outlineOffset: OutlineOffset;
  outlineWidth: OutlineOffset;
  padding: Spacing;
  placeholderColor: BackgroundColor;
  placeholderOpacity: BackdropOpacity;
  ringColor: BorderColor;
  ringOffsetColor: BackgroundColor;
  ringOffsetWidth: OutlineOffset;
  ringOpacity: RingOpacity;
  ringWidth: RingWidth;
  rotate: Rotate;
  saturate: BackdropSaturate;
  scale: Scale;
  scrollMargin: Spacing;
  scrollPadding: Spacing;
  sepia: BackdropGrayscale;
  skew: Skew;
  space: Spacing;
  spacing: Spacing;
  stroke: Fill;
  strokeWidth: StrokeWidth;
  supports: Supports;
  data: Supports;
  textColor: BackgroundColor;
  textDecorationColor: BackgroundColor;
  textDecorationThickness: TextDecorationThickness;
  textIndent: Spacing;
  textOpacity: BackdropOpacity;
  textUnderlineOffset: TextUnderlineOffset;
  transformOrigin: TransformOrigin;
  transitionDelay: TransitionDelay;
  transitionDuration: TransitionDuration;
  transitionProperty: TransitionProperty;
  transitionTimingFunction: TransitionTimingFunction;
  translate: Translate;
  width: Width;
  willChange: WillChange;
  zIndex: ZIndex;
  animationDelay: TransitionDelay;
  animationDuration: TransitionDuration;
  animationTimingFunction: TransitionTimingFunction;
  animationFillMode: AnimationFillMode;
  animationDirection: AnimationDirection;
  animationOpacity: AnimationOpacity;
  animationTranslate: AnimationTranslate;
  animationScale: AnimationScale;
  animationRotate: AnimationRotate;
  animationRepeat: AnimationRepeat;
}

interface AnimationRepeat {
  '0': string;
  '1': string;
  infinite: string;
}

interface AnimationRotate {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '6': string;
  '12': string;
  '45': string;
  '90': string;
  '180': string;
  DEFAULT: string;
}

interface AnimationScale {
  '0': string;
  '50': string;
  '75': string;
  '90': string;
  '95': string;
  '100': string;
  '105': string;
  '110': string;
  '125': string;
  '150': string;
  DEFAULT: number;
}

interface AnimationTranslate {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  DEFAULT: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  full: string;
}

interface AnimationOpacity {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
  DEFAULT: number;
}

interface AnimationDirection {
  normal: string;
  reverse: string;
  alternate: string;
  'alternate-reverse': string;
}

interface AnimationFillMode {
  none: string;
  forwards: string;
  backwards: string;
  both: string;
}

interface ZIndex {
  '0': string;
  '10': string;
  '20': string;
  '30': string;
  '40': string;
  '50': string;
  auto: string;
}

interface WillChange {
  auto: string;
  scroll: string;
  contents: string;
  transform: string;
}

interface Width {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  auto: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  '1/5': string;
  '2/5': string;
  '3/5': string;
  '4/5': string;
  '1/6': string;
  '2/6': string;
  '3/6': string;
  '4/6': string;
  '5/6': string;
  '1/12': string;
  '2/12': string;
  '3/12': string;
  '4/12': string;
  '5/12': string;
  '6/12': string;
  '7/12': string;
  '8/12': string;
  '9/12': string;
  '10/12': string;
  '11/12': string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
  A4: string;
}

interface Translate {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  full: string;
}

interface TransitionTimingFunction {
  DEFAULT: string;
  linear: string;
  in: string;
  out: string;
  'in-out': string;
}

interface TransitionProperty {
  none: string;
  all: string;
  DEFAULT: string;
  colors: string;
  opacity: string;
  shadow: string;
  transform: string;
}

interface TransitionDuration {
  '0': string;
  '75': string;
  '100': string;
  '150': string;
  '200': string;
  '300': string;
  '500': string;
  '700': string;
  '1000': string;
  DEFAULT: string;
}

interface TransitionDelay {
  '0': string;
  '75': string;
  '100': string;
  '150': string;
  '200': string;
  '300': string;
  '500': string;
  '700': string;
  '1000': string;
}

interface TransformOrigin {
  center: string;
  top: string;
  'top-right': string;
  right: string;
  'bottom-right': string;
  bottom: string;
  'bottom-left': string;
  left: string;
  'top-left': string;
}

interface TextUnderlineOffset {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
  auto: string;
}

interface TextDecorationThickness {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
  auto: string;
  'from-font': string;
}

interface Supports {}

interface StrokeWidth {
  '0': string;
  '1': string;
  '2': string;
}

interface Skew {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '6': string;
  '12': string;
}

interface Scale {
  '0': string;
  '50': string;
  '75': string;
  '90': string;
  '95': string;
  '100': string;
  '105': string;
  '110': string;
  '125': string;
  '150': string;
}

interface Rotate {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '6': string;
  '12': string;
  '45': string;
  '90': string;
  '180': string;
}

interface RingWidth {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
  DEFAULT: string;
}

interface RingOpacity {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
  DEFAULT: string;
}

interface OutlineOffset {
  '0': string;
  '1': string;
  '2': string;
  '4': string;
  '8': string;
}

interface Order {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  first: string;
  last: string;
  none: string;
}

interface MinWidth {
  '0': string;
  full: string;
  min: string;
  max: string;
  fit: string;
}

interface MinHeight {
  '0': string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
}

interface MaxWidth {
  '0': string;
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
  full: string;
  min: string;
  max: string;
  fit: string;
  prose: string;
  'screen-xs': string;
  'screen-sm': string;
  'screen-md': string;
  'screen-lg': string;
  'screen-xl': string;
  'screen-2xl': string;
  'screen-3xl': string;
}

interface MaxHeight {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  none: string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
}

interface LineClamp {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
}

interface Margin {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  auto: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
}

interface ListStyleType {
  none: string;
  disc: string;
  decimal: string;
}

interface LineHeight {
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

interface Keyframes {
  spin: Spin;
  ping: Ping;
  pulse: Pulse;
  bounce: Bounce;
  enter: Enter;
  exit: Exit;
  'accordion-down': Accordiondown;
  'accordion-up': Accordiondown;
  slideDownAndFade: SlideDownAndFade;
  slideLeftAndFade: SlideDownAndFade;
  slideUpAndFade: SlideDownAndFade;
  slideRightAndFade: SlideDownAndFade;
}

interface SlideDownAndFade {
  from: _75100;
  to: _75100;
}

interface Accordiondown {
  from: From;
  to: From;
}

interface From {
  height: string;
}

interface Exit {
  to: _75100;
}

interface Enter {
  from: _75100;
}

interface Bounce {
  '0%, 100%': _0100;
  '50%': _0100;
}

interface _0100 {
  transform: string;
  animationTimingFunction: string;
}

interface Pulse {
  '50%': _50;
}

interface _50 {
  opacity: string;
}

interface Ping {
  '75%, 100%': _75100;
}

interface _75100 {
  transform: string;
  opacity: string;
}

interface Spin {
  to: To;
}

interface To {
  transform: string;
}

interface Inset {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  auto: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  full: string;
}

interface Height {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  auto: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  '1/5': string;
  '2/5': string;
  '3/5': string;
  '4/5': string;
  '1/6': string;
  '2/6': string;
  '3/6': string;
  '4/6': string;
  '5/6': string;
  full: string;
  screen: string;
  min: string;
  max: string;
  fit: string;
  A4: string;
}

interface GridTemplateRows {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  none: string;
}

interface GridTemplateColumns {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  none: string;
}

interface GridRowEnd {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  auto: string;
}

interface GridRow {
  auto: string;
  'span-1': string;
  'span-2': string;
  'span-3': string;
  'span-4': string;
  'span-5': string;
  'span-6': string;
  'span-full': string;
}

interface GridColumnEnd {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '13': string;
  auto: string;
}

interface GridColumn {
  auto: string;
  'span-1': string;
  'span-2': string;
  'span-3': string;
  'span-4': string;
  'span-5': string;
  'span-6': string;
  'span-7': string;
  'span-8': string;
  'span-9': string;
  'span-10': string;
  'span-11': string;
  'span-12': string;
  'span-full': string;
}

interface GridAutoColumns {
  auto: string;
  min: string;
  max: string;
  fr: string;
}

interface GradientColorStopPositions {
  '0%': string;
  '5%': string;
  '10%': string;
  '15%': string;
  '20%': string;
  '25%': string;
  '30%': string;
  '35%': string;
  '40%': string;
  '45%': string;
  '50%': string;
  '55%': string;
  '60%': string;
  '65%': string;
  '70%': string;
  '75%': string;
  '80%': string;
  '85%': string;
  '90%': string;
  '95%': string;
  '100%': string;
}

interface FontWeight {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

export interface FontSize {
  xs: (X | string)[];
  sm: (X | string)[];
  base: (X | string)[];
  lg: (X | string)[];
  xl: (X | string)[];
  '2xl': (X | string)[];
  '3xl': (X | string)[];
  '4xl': (X | string)[];
  '5xl': (X | string)[];
  '6xl': (X | string)[];
  '7xl': (X | string)[];
  '8xl': (X | string)[];
  '9xl': (X | string)[];
  tiny: string;
  '2xs': string;
  '3xs': string;
}

interface X {
  lineHeight: string;
}

interface FontFamily {
  sans: string[];
  serif: string[];
  mono: string[];
}

interface FlexBasis {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  auto: string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
  '1/2': string;
  '1/3': string;
  '2/3': string;
  '1/4': string;
  '2/4': string;
  '3/4': string;
  '1/5': string;
  '2/5': string;
  '3/5': string;
  '4/5': string;
  '1/6': string;
  '2/6': string;
  '3/6': string;
  '4/6': string;
  '5/6': string;
  '1/12': string;
  '2/12': string;
  '3/12': string;
  '4/12': string;
  '5/12': string;
  '6/12': string;
  '7/12': string;
  '8/12': string;
  '9/12': string;
  '10/12': string;
  '11/12': string;
  full: string;
}

interface Flex {
  '1': string;
  auto: string;
  initial: string;
  none: string;
}

interface Fill {
  none: string;
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: Slate;
  gray: Slate;
  zinc: Slate;
  neutral: Slate;
  stone: Slate;
  red: Slate;
  orange: Slate;
  amber: Slate;
  yellow: Slate;
  lime: Slate;
  green: Slate;
  emerald: Slate;
  teal: Slate;
  cyan: Slate;
  sky: Slate;
  blue: Slate;
  indigo: Slate;
  violet: Slate;
  purple: Slate;
  fuchsia: Slate;
  pink: Slate;
  rose: Slate;
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: Primary;
  secondary: Primary;
  tertiary: Primary;
  info: Primary;
  success: Primary;
  warning: Primary;
  danger: Primary;
  muted: Primary;
  accent: Primary;
  popover: Primary;
  card: Primary;
}

interface DropShadow {
  sm: string;
  DEFAULT: string[];
  md: string[];
  lg: string[];
  xl: string[];
  '2xl': string;
  none: string;
}

interface Cursor {
  auto: string;
  default: string;
  pointer: string;
  wait: string;
  text: string;
  move: string;
  help: string;
  'not-allowed': string;
  none: string;
  'context-menu': string;
  progress: string;
  cell: string;
  crosshair: string;
  'vertical-text': string;
  alias: string;
  copy: string;
  'no-drop': string;
  grab: string;
  grabbing: string;
  'all-scroll': string;
  'col-resize': string;
  'row-resize': string;
  'n-resize': string;
  'e-resize': string;
  's-resize': string;
  'w-resize': string;
  'ne-resize': string;
  'nw-resize': string;
  'se-resize': string;
  'sw-resize': string;
  'ew-resize': string;
  'ns-resize': string;
  'nesw-resize': string;
  'nwse-resize': string;
  'zoom-in': string;
  'zoom-out': string;
}

interface Content {
  none: string;
}

interface Columns {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  auto: string;
  '3xs': string;
  '2xs': string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
}

interface BoxShadow {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

interface BorderWidth {
  '0': string;
  '2': string;
  '4': string;
  '8': string;
  DEFAULT: string;
}

interface Spacing {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '84': string;
  '88': string;
  '96': string;
  '108': string;
  '128': string;
  px: string;
  '0.5': string;
  '1.5': string;
  '2.5': string;
  '3.5': string;
}

interface BorderRadius {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

interface BorderColor {
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: Slate;
  gray: Slate;
  zinc: Slate;
  neutral: Slate;
  stone: Slate;
  red: Slate;
  orange: Slate;
  amber: Slate;
  yellow: Slate;
  lime: Slate;
  green: Slate;
  emerald: Slate;
  teal: Slate;
  cyan: Slate;
  sky: Slate;
  blue: Slate;
  indigo: Slate;
  violet: Slate;
  purple: Slate;
  fuchsia: Slate;
  pink: Slate;
  rose: Slate;
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: Primary;
  secondary: Primary;
  tertiary: Primary;
  info: Primary;
  success: Primary;
  warning: Primary;
  danger: Primary;
  muted: Primary;
  accent: Primary;
  popover: Primary;
  card: Primary;
  DEFAULT: string;
}

interface BackgroundSize {
  auto: string;
  cover: string;
  contain: string;
}

interface BackgroundPosition {
  bottom: string;
  center: string;
  left: string;
  'left-bottom': string;
  'left-top': string;
  right: string;
  'right-bottom': string;
  'right-top': string;
  top: string;
}

interface BackgroundImage {
  none: string;
  'gradient-to-t': string;
  'gradient-to-tr': string;
  'gradient-to-r': string;
  'gradient-to-br': string;
  'gradient-to-b': string;
  'gradient-to-bl': string;
  'gradient-to-l': string;
  'gradient-to-tl': string;
}

interface BackgroundColor {
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: Slate;
  gray: Slate;
  zinc: Slate;
  neutral: Slate;
  stone: Slate;
  red: Slate;
  orange: Slate;
  amber: Slate;
  yellow: Slate;
  lime: Slate;
  green: Slate;
  emerald: Slate;
  teal: Slate;
  cyan: Slate;
  sky: Slate;
  blue: Slate;
  indigo: Slate;
  violet: Slate;
  purple: Slate;
  fuchsia: Slate;
  pink: Slate;
  rose: Slate;
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: Primary;
  secondary: Primary;
  tertiary: Primary;
  info: Primary;
  success: Primary;
  warning: Primary;
  danger: Primary;
  muted: Primary;
  accent: Primary;
  popover: Primary;
  card: Primary;
}

interface BackdropSaturate {
  '0': string;
  '50': string;
  '100': string;
  '150': string;
  '200': string;
}

interface BackdropOpacity {
  '0': string;
  '5': string;
  '10': string;
  '20': string;
  '25': string;
  '30': string;
  '40': string;
  '50': string;
  '60': string;
  '70': string;
  '75': string;
  '80': string;
  '90': string;
  '95': string;
  '100': string;
}

interface BackdropHueRotate {
  '0': string;
  '15': string;
  '30': string;
  '60': string;
  '90': string;
  '180': string;
}

interface BackdropGrayscale {
  '0': string;
  DEFAULT: string;
}

interface BackdropContrast {
  '0': string;
  '50': string;
  '75': string;
  '100': string;
  '125': string;
  '150': string;
  '200': string;
}

interface BackdropBrightness {
  '0': string;
  '50': string;
  '75': string;
  '90': string;
  '95': string;
  '100': string;
  '105': string;
  '110': string;
  '125': string;
  '150': string;
  '200': string;
}

interface BackdropBlur {
  '0': string;
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

interface AspectRatio {
  auto: string;
  square: string;
  video: string;
}

interface Aria {
  busy: string;
  checked: string;
  disabled: string;
  expanded: string;
  hidden: string;
  pressed: string;
  readonly: string;
  required: string;
  selected: string;
}

interface Animation {
  none: string;
  spin: string;
  ping: string;
  pulse: string;
  bounce: string;
  'accordion-down': string;
  'accordion-up': string;
  slideDownAndFade: string;
  slideLeftAndFade: string;
  slideUpAndFade: string;
  slideRightAndFade: string;
}

interface AccentColor {
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: Slate;
  gray: Slate;
  zinc: Slate;
  neutral: Slate;
  stone: Slate;
  red: Slate;
  orange: Slate;
  amber: Slate;
  yellow: Slate;
  lime: Slate;
  green: Slate;
  emerald: Slate;
  teal: Slate;
  cyan: Slate;
  sky: Slate;
  blue: Slate;
  indigo: Slate;
  violet: Slate;
  purple: Slate;
  fuchsia: Slate;
  pink: Slate;
  rose: Slate;
  border: string;
  input: string;
  ring: string;
  background: string;
  foreground: string;
  primary: Primary;
  secondary: Primary;
  tertiary: Primary;
  info: Primary;
  success: Primary;
  warning: Primary;
  danger: Primary;
  muted: Primary;
  accent: Primary;
  popover: Primary;
  card: Primary;
  auto: string;
}

interface Primary {
  DEFAULT: string;
  foreground: string;
}

interface Slate {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950': string;
}

interface Screens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

interface Container {
  center: boolean;
  padding: string;
  screens: ContainerScreens;
}

interface ContainerScreens {
  '2xl': string;
}
