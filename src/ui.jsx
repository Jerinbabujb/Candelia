import React, { createContext, forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import {
  ArrowLeft, ArrowRight, ChevronRight, Info, UserCircle, Search, Calendar, Check,
  CheckCircle, XCircle, Circle, Phone, Map, ExternalLink, RotateCcw, ShieldCheck,
  ShoppingBag, User, GraduationCap, Plus, Minus, Scissors, Sparkles, Heart,
  Dumbbell, Shirt, Leaf, Flower2, PersonStanding, Sun, Smile, Home, Compass,
  LayoutGrid, BriefcaseBusiness, Star, Camera, MapPin, Clock, CreditCard,
  CircleDot, Square, Glasses, Droplet,
} from 'lucide-react';

// DOM primitives keep the original screen layouts in one readable JSX file.
// Numeric line heights and directional spacing are normalized to valid CSS.
export function css(input) {
  const value = Object.assign({}, ...(Array.isArray(input) ? input.flat(Infinity).filter(Boolean) : [input || {}]));
  const result = {};
  const spacing = {
    paddingHorizontal: ['paddingLeft', 'paddingRight'], paddingVertical: ['paddingTop', 'paddingBottom'],
    marginHorizontal: ['marginLeft', 'marginRight'], marginVertical: ['marginTop', 'marginBottom'],
  };
  for (const [key, item] of Object.entries(value)) {
    if (spacing[key]) spacing[key].forEach(k => result[k] = item);
    else if (key === 'lineHeight' && typeof item === 'number') result[key] = `${item}px`;
    else if (key === 'textAlignVertical') result.verticalAlign = item;
    else result[key] = item;
  }
  return result;
}
export const styles = { create: value => value, absoluteFillObject: { position: 'absolute', inset: 0 } };
const textContext = createContext(false);

export function Box({ style, children, className = '', ...rest }) {
  return <div className={`app-box ${className}`} style={css(style)} {...rest}>{children}</div>;
}
export function Copy({ style, children, ...rest }) {
  const nested = useContext(textContext);
  const Tag = nested ? 'span' : 'div';
  return <textContext.Provider value={true}><Tag className="app-copy" style={css(style)} {...rest}>{children}</Tag></textContext.Provider>;
}
export function Action({ style, children, onClick, disabled, ...rest }) {
  const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
  return <button type="button" className="app-action" style={css(resolved)} onClick={onClick} disabled={disabled} {...rest}>{children}</button>;
}
export function Input({ style, onValueChange, multiline, keyboardType, placeholderTextColor, ...rest }) {
  const Tag = multiline ? 'textarea' : 'input';
  return <Tag className="app-input" type={multiline ? undefined : keyboardType === 'email-address' ? 'email' : 'text'}
    style={css(style)} onChange={e => onValueChange?.(e.target.value)} {...rest} />;
}
const imageSource = source => typeof source === 'string' ? source : source?.uri;
export function Picture({ source, style, alt = '' }) {
  return <img className="app-picture" alt={alt} src={imageSource(source)} style={css(style)} />;
}
export function Backdrop({ source, style, imageStyle, children }) {
  return <div className="app-box app-backdrop" style={css(style)}>
    <img className="backdrop-picture" src={imageSource(source)} alt="" style={css(imageStyle)} />{children}
  </div>;
}
export const ScrollArea = forwardRef(function ScrollArea({ style, contentContainerStyle, horizontal, children }, ref) {
  const element = useRef();
  useImperativeHandle(ref, () => ({ scrollTo: value => element.current?.scrollTo(value) }));
  return <div ref={element} className={`app-scroll ${horizontal ? 'horizontal' : 'vertical'}`} style={css(style)}>
    <div className="app-box scroll-content" style={css(contentContainerStyle)}>{children}</div>
  </div>;
});
const icons = {
  'arrow-back': ArrowLeft, 'arrow-forward': ArrowRight, 'chevron-forward': ChevronRight,
  'information-circle': Info, 'person-circle': UserCircle, search: Search, calendar: Calendar,
  checkmark: Check, 'checkmark-circle': CheckCircle, 'close-circle': XCircle, ellipse: Circle,
  call: Phone, map: Map, open: ExternalLink, refresh: RotateCcw, 'shield-checkmark': ShieldCheck,
  bag: ShoppingBag, person: User, school: GraduationCap, add: Plus, remove: Minus,
  cut: Scissors, sparkles: Sparkles, heart: Heart, barbell: Dumbbell, shirt: Shirt, leaf: Leaf,
  flower: Flower2, body: PersonStanding, sunny: Sun, happy: Smile, home: Home, compass: Compass,
  grid: LayoutGrid, briefcase: BriefcaseBusiness, star: Star, camera: Camera, location: MapPin,
  time: Clock, card: CreditCard,
  'radio-button-on': CircleDot, 'radio-button-off': Circle, square: Square,
  glasses: Glasses, water: Droplet,
};
export function Icon({ name = '', size = 22, color = '#243C30' }) {
  const Component = icons[name.replace(/-outline$/, '')] || Sparkles;
  return <Component size={size} color={color} strokeWidth={1.6} aria-hidden="true" style={{ flexShrink: 0 }} />;
}
export function openLink(url) {
  if (url.startsWith('tel:')) window.location.href = url;
  else window.open(url, '_blank', 'noopener,noreferrer');
}
export function pickImage() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.addEventListener('cancel', () => resolve(null), { once: true });
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      if (!file.type.startsWith('image/')) return reject(new Error('Choose an image file.'));
      if (file.size > 4 * 1024 * 1024) return reject(new Error('Please choose an image smaller than 4 MB.'));
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read that image.'));
      reader.readAsDataURL(file);
    }, { once: true });
    input.click();
  });
}
