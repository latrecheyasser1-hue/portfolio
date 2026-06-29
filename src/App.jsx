import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Monitor, 
  Cloud, 
  Terminal, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  Server, 
  Layout, 
  Sparkles,
  Briefcase,
  ChevronRight,
  ArrowRight,
  GitBranch,
  MessageSquare,
  X,
  SendHorizontal,
  ShoppingBag,
  Globe,
  Plus,
  Minus
} from 'lucide-react';

// Custom Official SVGs for Tech Stack Icons
const TechIcons = {
  React: () => <svg className="w-5 h-5 text-[#00D8FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><ellipse rx="10" ry="4.5" cx="12" cy="12"/><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)"/></svg>,
  Nextjs: () => <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.583-1.574 6.801-4.067 9.001L9.116 6.85H7v10.3h2.15v-7.388l9.515 12.216zM15.85 6.85h2.15v10.3h-2.15z"/></svg>,
  Vue: () => <svg className="w-5 h-5 text-[#42B883]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 1.61H14.06L12 5.16 9.94 1.61H0L12 22.39 24 1.61zM12 14.08L5.16 2.23H9.59L12 6.41l2.41-4.18h4.43L12 14.08z"/></svg>,
  Tailwind: () => <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624 1.177-1.194 2.538-2.576 5.512-2.576z"/></svg>,
  Node: () => <svg className="w-5 h-5 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor"><path d="M11.996 0a1.119 1.119 0 0 0-.555.148L2.39 5.378a1.119 1.119 0 0 0-.56.97v10.457c0 .402.215.772.56.972l9.052 5.23a1.119 1.119 0 0 0 1.112 0l9.052-5.23a1.119 1.119 0 0 0 .56-.972V6.348a1.119 1.119 0 0 0-.56-.97L12.55 0.148A1.119 1.119 0 0 0 11.996 0zm0 1.543l8.031 4.64v9.282l-8.031 4.64-8.031-4.64V6.183l8.031-4.64z"/></svg>,
  Laravel: () => <svg className="w-5 h-5 text-[#FF2D20]" viewBox="0 0 24 24" fill="currentColor"><path d="M7.01 10.207l-3.322 1.936V16.02l3.322 1.936 3.322-1.936v-3.877l-3.322-1.936zm0 1.528l2.016 1.175-2.016 1.175-2.016-1.175 2.016-1.175zm-2.016 3.447l2.016 1.175 2.016-1.175v-2.35l-2.016 1.175v1.175zm5.338-1.175l-2.016 1.175v-1.175l2.016-1.175v1.175zm10.663-8.88l-6.645 3.873v7.749l6.645 3.873 6.645-3.873V9.001l-6.645-3.874zm0 1.528l5.339 3.112-5.339 3.112-5.339-3.112 5.339-3.112zm-5.339 7.76l5.339 3.112 5.339-3.112v-6.224l-5.339 3.112v3.112zm11.984-3.112l-5.339 3.112v-3.112l5.339-3.112v3.112z"/></svg>,
  Python: () => <svg className="w-5 h-5 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.27-.73-.2-.88-.14-1.01-.07-1.13-.02-1.21.02-1.21.07-1.13.14-1.01.2-.88.27-.73.32-.59.35-.46.36-.36.36-.26.35-.18.32-.12.28-.07.21-.03h5.71l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h4.52V1.16z"/></svg>,
  Postgres: () => <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.062 0c-1.393 0-2.61.985-3.56 2.302-.924 1.282-1.528 2.846-1.782 4.472-.258 1.644-.155 3.322.298 4.908.455 1.59 1.238 3.056 2.32 4.296 1.077 1.235 2.458 2.222 4.095 2.87 1.643.652 3.518.966 5.567.934V0h-7zm0 2.215h4.785v15.35c-1.597.025-3.06-.214-4.347-.723-1.294-.512-2.383-1.295-3.23-2.268-.853-.978-1.47-2.138-1.83-3.4-.363-1.268-.444-2.6-.242-3.896.204-1.306.685-2.552 1.418-3.568.736-1.02 1.708-1.8 2.825-1.8z"/></svg>,
  Supabase: () => <svg className="w-5 h-5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a.396.396 0 0 0 .324.66h9.362v8.958a.396.396 0 0 0 .716.233l9.081-12.262.401-.562a.396.396 0 0 0-.324-.66z"/></svg>,
  Java: () => <svg className="w-5 h-5 text-[#ED8B00]" viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 18.2c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8 0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.3 0 .6.1.8.3.2.2.3.5.3.8 0 .3-.1.6-.3.8-.2.2-.5.3-.8.3zm7.8 0c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8 0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.3 0 .6.1.8.3.2.2.3.5.3.8 0 .3-.1.6-.3.8-.2.2-.5.3-.8.3zm-3.9 3.4c-3.1 0-5.9-1.1-7.8-3 .5-.4 1.1-.6 1.7-.6 1.6 1.4 3.8 2.2 6.1 2.2 2.3 0 4.5-.8 6.1-2.2.6 0 1.2.2 1.7.6-1.9 1.9-4.7 3-7.8 3z"/></svg>,
  Electron: () => <svg className="w-5 h-5 text-[#47848F]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z"/></svg>,
  Netlify: () => <svg className="w-5 h-5 text-[#00C7B7]" viewBox="0 0 24 24" fill="currentColor"><path d="M6.49 19.16v-4.52h-4.52v4.52h4.52zm1.6-4.52v4.52h4.52v-4.52H8.09zm-6.12-1.6h4.52V8.52H1.97v4.52zm6.12 0h4.52V8.52H8.09v4.52zm6.12 0h4.52V8.52h-4.52v4.52zm-6.12-6.12h4.52V2.4H8.09v4.52z"/></svg>,
  GitHub: () => <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
};

// Reusable Magnetic Pull Component (Cuberto Pull Effect)
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Smooth magnetic pull offset
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: x === 0 && y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
};

// Reusable Scroll Reveal Wrapper
const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Reusable Masked Text Reveal Wrapper
const TextReveal = ({ text, className = "", delay = 0 }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <span ref={domRef} className={`text-reveal-wrapper ${isVisible ? 'is-visible' : ''} ${className}`}>
      <span className="text-reveal-item" style={{ transitionDelay: `${delay}ms` }}>
        {text}
      </span>
    </span>
  );
};

// Custom Cuberto Rolling Link Component
const NavHoverLink = ({ href, label, onMouseEnter, onMouseLeave }) => {
  return (
    <a 
      href={href} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative block h-[22px] overflow-hidden group py-0"
    >
      <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
        {/* Primary View */}
        <div className="h-[22px] flex items-center text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors font-medium text-[15px]">
          {label}
        </div>
        {/* Hover View */}
        <div className="h-[22px] flex items-center text-black dark:text-white font-medium text-[15px]">
          {label}
        </div>
      </div>
    </a>
  );
};

// Reusable 3D Parallax Profile Card (Real Interactive 3D Parallax & Spring entrance)
const ProfileCard3D = ({ onMouseEnter, onMouseLeave }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Maximum tilt angles: 12 degrees on X/Y axes
    const tiltX = (mouseY / (height / 2)) * -12; 
    const tiltY = (mouseX / (width / 2)) * 12;   
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    onMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="profile-card-3d-entrance relative"
      style={{
        transform: isHovered 
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)` 
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        width: '340px',
        aspectRatio: '4/5'
      }}
    >
      {/* 3D Wrapper Layer */}
      <div 
        className="w-full h-full rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-2xl transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Pushed Back Image layer with hover zoom & filter contrast effect */}
        <img 
          src="/yasser.jpg" 
          alt="Latreche Yasser" 
          className="w-full h-full object-cover filter contrast-105 brightness-95 transition-all duration-700 ease-out"
          style={{ 
            transform: isHovered ? 'translateZ(-12px) scale(1.15)' : 'translateZ(-12px) scale(1.08)',
            filter: isHovered ? 'contrast(1.08) brightness(1.02)' : 'contrast(1.05) brightness(0.95)'
          }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-zinc-950/90 via-transparent to-transparent opacity-60"></div>
        
        {/* Holographic Parallax Floating bottom Glass Badge */}
        <div 
          className="absolute bottom-5 left-5 right-5 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            transform: isHovered ? 'translateZ(45px) scale(1.02)' : 'translateZ(20px) scale(1)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">Latreche Yasser</h4>
              <p className="text-[9px] text-zinc-500 dark:text-zinc-400 uppercase mt-0.5 font-semibold">Available for Booking</p>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [cursorState, setCursorState] = useState('normal'); // 'normal', 'link', 'project', 'button', 'profile'
  const [openFaq, setOpenFaq] = useState(null);
  
  // Custom Smooth Cursor logic
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  // Floating Chat Widget States
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [widgetMethod, setWidgetMethod] = useState('whatsapp'); // 'whatsapp', 'email'
  const [widgetData, setWidgetData] = useState({ name: '', email: '', message: '' });
  const [widgetSuccess, setWidgetSuccess] = useState(false);

  // YOUR OFFICIAL CONFIGURATION
  const myWhatsAppNumber = "213771335039"; // Official Yasser WhatsApp Number (format: 213 + number without leading 0)
  const myEmailAddress = "latrecheyasser1@gmail.com"; // Official Yasser Email Address
  const myFormspreeEndpoint = "https://formspree.io/f/mojolavv"; // Paste Formspree Endpoint here (e.g. "https://formspree.io/f/your_id") to receive automatic emails

  // Disables default browser scroll restoration behavior and forces scroll to top on page mount/refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let lastX = 0;
    let lastY = 0;

    const updateFollower = () => {
      const ease = 0.12; 
      const dx = mousePos.current.x - followerPos.current.x;
      const dy = mousePos.current.y - followerPos.current.y;
      
      followerPos.current.x += dx * ease;
      followerPos.current.y += dy * ease;

      // Dynamic stretch calculation based on actual coordinate offset speed
      const velX = followerPos.current.x - lastX;
      const velY = followerPos.current.y - lastY;
      lastX = followerPos.current.x;
      lastY = followerPos.current.y;

      const velocity = Math.min(Math.sqrt(velX * velX + velY * velY) * 0.08, 0.4);
      const angle = Math.atan2(velY, velX) * 180 / Math.PI;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${followerPos.current.x}px`;
        cursorRef.current.style.top = `${followerPos.current.y}px`;
        
        // Fluid mercury dynamic morphing stretch (Velocity morph transform)
        const scaleX = 1 + velocity;
        const scaleY = 1 - velocity;
        cursorRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      animationFrameId = requestAnimationFrame(updateFollower);
    };

    updateFollower();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const onMouseEnterLink = () => setCursorState('link');
  const onMouseLeaveLink = () => setCursorState('normal');
  const onMouseEnterProject = () => setCursorState('project');
  const onMouseLeaveProject = () => setCursorState('normal');
  const onMouseEnterButton = () => setCursorState('button');
  const onMouseLeaveButton = () => setCursorState('normal');
  const onMouseEnterProfile = () => setCursorState('profile');
  const onMouseLeaveProfile = () => setCursorState('normal');

  // Submit handler for floating widget
  const handleWidgetSubmit = async (e) => {
    e.preventDefault();
    if (!widgetData.message.trim()) return;

    if (widgetMethod === 'whatsapp') {
      // Build and open WhatsApp prefilled link
      const text = `Hi Yasser, my name is ${widgetData.name || 'Visitor'}.\n\n${widgetData.message}\n\nContact: ${widgetData.email || 'None'}`;
      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodedText}`;
      window.open(waUrl, '_blank');
      setWidgetSuccess(true);
    } else {
      // Direct Email via Formspree API (or fallback to mailto if endpoint is empty)
      if (myFormspreeEndpoint) {
        try {
          const response = await fetch(myFormspreeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: widgetData.name,
              email: widgetData.email,
              message: widgetData.message
            })
          });
          if (response.ok) {
            setWidgetSuccess(true);
          }
        } catch (error) {
          console.error("Error sending email", error);
        }
      } else {
        // Fallback: Open client email composer prefilled with mailto via window.location.href (more reliable)
        const subject = encodeURIComponent(`Portfolio Message from ${widgetData.name}`);
        const body = encodeURIComponent(`${widgetData.message}\n\nSender Email: ${widgetData.email}`);
        window.location.href = `mailto:${myEmailAddress}?subject=${subject}&body=${body}`;
        setWidgetSuccess(true);
      }
    }

    // Reset Form fields after 4 seconds
    setTimeout(() => {
      setWidgetData({ name: '', email: '', message: '' });
      setWidgetSuccess(false);
      setIsWidgetOpen(false);
    }, 4000);
  };

  const techCategories = [
    {
      title: "Frontend & Web Development",
      skills: [
        { name: "React", icon: TechIcons.React },
        { name: "Next.js", icon: TechIcons.Nextjs },
        { name: "Vite / Web Apps", icon: () => <Sparkles className="w-5 h-5 text-[#646CFF]" /> },
        { name: "Tailwind CSS", icon: TechIcons.Tailwind },
        { name: "JavaScript / TS", icon: () => <Code2 className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> },
        { name: "HTML5 / CSS3", icon: () => <Layout className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> }
      ]
    },
    {
      title: "Backend & Databases",
      skills: [
        { name: "Node.js", icon: TechIcons.Node },
        { name: "PHP / Laravel", icon: TechIcons.Laravel },
        { name: "Python", icon: TechIcons.Python },
        { name: "PostgreSQL", icon: TechIcons.Postgres },
        { name: "Supabase", icon: TechIcons.Supabase },
        { name: "RESTful APIs", icon: () => <Server className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> }
      ]
    },
    {
      title: "Desktop & Enterprise Software",
      skills: [
        { name: "Electron.js", icon: TechIcons.Electron },
        { name: "Java", icon: TechIcons.Java },
        { name: "Desktop POS", icon: () => <Monitor className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> },
        { name: "ERP Systems", icon: () => <Briefcase className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> }
      ]
    },
    {
      title: "Cloud Services & Integration",
      skills: [
        { name: "Netlify", icon: TechIcons.Netlify },
        { name: "Git / GitHub", icon: TechIcons.GitHub },
        { name: "Cloud Hosting", icon: () => <Cloud className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> },
        { name: "API Integrations", icon: () => <GitBranch className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> }
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "ClinicFlowDZ",
      subtitle: "Full-Stack Healthcare SaaS Platform",
      category: "saas",
      description: "Engineered from A to Z. A complete medical clinic management and workflow optimization SaaS platform designed for high performance and reliability.",
      url: "https://clinicflowdz.com",
      tags: ["SaaS", "Full-Stack", "Cloud Database", "Architecture"],
      featured: true
    },
    {
      id: 2,
      title: "Asel Butik (Online)",
      subtitle: "E-Commerce Fashion Store",
      category: "ecommerce",
      description: "High-converting online e-commerce platform with fast product catalog browsing, sleek UI design, and seamless checkout experience.",
      url: "https://asel-butik.netlify.app/",
      tags: ["E-Commerce", "Netlify", "Responsive UI", "High Speed"],
      featured: false
    },
    {
      id: 3,
      title: "In3itaf Art",
      subtitle: "Art Showcase & Storefront",
      category: "ecommerce",
      description: "Minimalist digital storefront for artistic creations, emphasizing visual presentation, fast image rendering, and fluid user navigation.",
      url: "https://in3itaf-art.netlify.app/",
      tags: ["E-Commerce", "Visual Arts", "Modern Web", "Netlify"],
      featured: false
    },
    {
      id: 4,
      title: "Massmakat La City",
      subtitle: "Fresh Seafood E-Commerce Platform",
      category: "ecommerce",
      description: "Specialized online commercial storefront for seafood distribution, featuring product categories, pricing systems, and order management.",
      url: "https://massmakat-la-city.netlify.app/",
      tags: ["E-Commerce", "Commercial Store", "Web App"],
      featured: false
    },
    {
      id: 5,
      title: "Asel Butik POS (Desktop)",
      subtitle: "Commercial Retail Management Software",
      category: "desktop",
      description: "Custom desktop application built for daily store operations, inventory tracking, sales processing, and automated cashier workflows.",
      url: "#",
      tags: ["Desktop Software", "POS", "Inventory", "Offline/Online"],
      featured: true,
      badge: "Desktop ERP"
    },
    {
      id: 6,
      title: "Tawabir Al-Aqsa (توابل الأقصى)",
      subtitle: "Spice & Grocery Store Management Software",
      category: "desktop",
      description: "Comprehensive desktop software managing complex stock variations, wholesale/retail pricing, and financial reporting for commercial markets.",
      url: "#",
      tags: ["Desktop App", "Store Management", "Database", "Accounting"],
      featured: false
    },
    {
      id: 7,
      title: "Private Schools & Enterprise Systems",
      subtitle: "Custom Management Software & Vitrine Sites",
      category: "saas",
      description: "Bespoke software architecture capable of automating private institution workflows, student management, and high-impact corporate vitrine websites.",
      url: "#",
      tags: ["Custom Systems", "Education ERP", "Vitrine Websites"],
      featured: false
    }
  ];

  const faqItems = [
    {
      question: "What types of projects do you specialize in?",
      answer: "I specialize in building high-converting E-Commerce stores, custom Web Platforms (SaaS), and tailormade Desktop Management Software (ERP/POS systems) built for speed and business growth."
    },
    {
      question: "Which technologies do you use for development?",
      answer: "I build modern web apps using React, Next.js, Vite, and Tailwind CSS. For databases, I use highly scalable cloud solutions like PostgreSQL and Supabase. For desktop platforms, I utilize Electron.js and Java."
    },
    {
      question: "How do you determine the pricing and timeline for a project?",
      answer: "Pricing and timeline depend entirely on the scope and features of your project. After a brief discovery meeting, I will provide a detailed quote and break down the project into clear milestones with weekly progress updates."
    },
    {
      question: "Do you offer maintenance and support after delivery?",
      answer: "Yes, every project comes with a dedicated free support and maintenance period (usually 30 days) to resolve any technical issues. Ongoing monthly maintenance and server optimization support is also available."
    },
    {
      question: "How does the workflow and communication look like?",
      answer: "We collaborate step-by-step. I show you progress through interactive staging links at each milestone. We communicate regularly via Telegram, Email, or WhatsApp to ensure the final product perfectly aligns with your expectations."
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-black font-sans antialiased transition-colors duration-500">
      
      {/* Custom Mouse Follower Bubble - Difference Mode for proper black background representation */}
      <div 
        ref={cursorRef} 
        className="mouse-follower hidden md:block" 
        style={{
          width: cursorState === 'project' || cursorState === 'profile' ? '90px' : cursorState === 'button' ? '55px' : cursorState === 'link' ? '0px' : '32px',
          height: cursorState === 'project' || cursorState === 'profile' ? '90px' : cursorState === 'button' ? '55px' : cursorState === 'link' ? '0px' : '32px',
          backgroundColor: cursorState === 'project' || cursorState === 'profile' ? '#ffffff' : 'transparent',
          borderColor: cursorState === 'project' || cursorState === 'profile' ? 'transparent' : cursorState === 'button' ? 'rgba(255, 255, 255, 0.4)' : cursorState === 'link' ? 'transparent' : 'rgba(255, 255, 255, 0.45)',
          opacity: cursorState === 'link' ? 0 : 1
        }}
      >
        {cursorState === 'project' && (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-[10px] uppercase font-bold text-black tracking-widest">View</span>
          </div>
        )}
        {cursorState === 'profile' && (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-[10px] uppercase font-bold text-black tracking-widest">Hello!</span>
          </div>
        )}
      </div>
      
      {/* Custom Center Dot - Inverted difference mode so it appears black on white screen, and white on black text */}
      <div 
        ref={cursorDotRef} 
        className="mouse-follower-dot hidden md:block" 
        style={{
          width: cursorState === 'link' ? '15px' : cursorState === 'project' || cursorState === 'button' || cursorState === 'profile' ? '0px' : '6px',
          height: cursorState === 'link' ? '15px' : cursorState === 'project' || cursorState === 'button' || cursorState === 'profile' ? '0px' : '6px',
          backgroundColor: '#ffffff', // Set to white so difference blend yields black on white background
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Navbar with entry animation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl px-8 py-5 animate-navbar-load">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo with magnetic pull */}
          <Magnetic>
            <div 
              className="flex items-center space-x-3.5 group"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
            >
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full animate-spin-slow transition-all" viewBox="0 0 100 100">
                  <path
                    id="logo-text-path"
                    d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text className="text-[6.8px] font-black uppercase tracking-[0.16em] fill-zinc-400 dark:fill-zinc-500">
                    <textPath href="#logo-text-path" startOffset="0%">
                      LATRECHE YASSER • SOFTWARE ARCHITECT •
                    </textPath>
                  </text>
                  <circle cx="50" cy="50" r="18" className="fill-black dark:fill-white" />
                  <text x="50" y="53.5" textAnchor="middle" className="text-[10px] font-black fill-white dark:fill-black tracking-widest font-sans">
                    LY
                  </text>
                </svg>
              </div>
              <span className="font-bold tracking-tight text-lg uppercase text-black dark:text-white">
                LATRECHE <span className="text-zinc-400 font-normal">YASSER</span>
              </span>
            </div>
          </Magnetic>
          
          {/* Menu items and Theme toggle with individual magnetic pulls & rolling hover animation */}
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <Magnetic>
                <NavHoverLink 
                  href="#hero" 
                  label="Home"
                  onMouseEnter={onMouseEnterLink} 
                  onMouseLeave={onMouseLeaveLink} 
                />
              </Magnetic>
              <Magnetic>
                <NavHoverLink 
                  href="#about" 
                  label="About"
                  onMouseEnter={onMouseEnterLink} 
                  onMouseLeave={onMouseLeaveLink} 
                />
              </Magnetic>
              <Magnetic>
                <NavHoverLink 
                  href="#skills" 
                  label="Tech Stack"
                  onMouseEnter={onMouseEnterLink} 
                  onMouseLeave={onMouseLeaveLink} 
                />
              </Magnetic>
              <Magnetic>
                <NavHoverLink 
                  href="#projects" 
                  label="Projects"
                  onMouseEnter={onMouseEnterLink} 
                  onMouseLeave={onMouseLeaveLink} 
                />
              </Magnetic>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-28 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hook Paragraph Above Title with Word-by-Word Wave Reveal */}
            <div className="max-w-xl text-lg sm:text-xl md:text-2xl font-normal leading-relaxed flex flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-1 sm:gap-y-1.5 items-baseline">
              {"Digital solutions crafted to scale and grow your business.".split(' ').map((word, idx) => (
                <TextReveal 
                  key={`b-${idx}`} 
                  text={word} 
                  className="font-extrabold text-black dark:text-white" 
                  delay={50 + idx * 25} 
                />
              ))}
              {"Whether you need a powerful web platform or a custom management system (ERP/POS), I build lightning-fast software that streamlines your operations and delights your users.".split(' ').map((word, idx) => (
                <TextReveal 
                  key={`n-${idx}`} 
                  text={word} 
                  className="text-zinc-600 dark:text-zinc-400" 
                  delay={275 + idx * 20} 
                />
              ))}
            </div>

            {/* Cuberto Staggered Text Reveal Title - Main Role: Full-Stack Web Developer */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-black dark:text-white">
              <div className="block py-0.5">
                <TextReveal text="Full-Stack" delay={450} />
              </div>
              <div className="block py-0.5">
                <TextReveal text="Web Developer." className="text-zinc-400 dark:text-zinc-500" delay={550} />
              </div>
            </h1>
            
            {/* Action Buttons */}
            <ScrollReveal delay={650} className="pt-2 flex flex-wrap gap-4 items-center">
              <Magnetic>
                <a 
                  href="#projects" 
                  onMouseEnter={onMouseEnterButton}
                  onMouseLeave={onMouseLeaveButton}
                  className="px-8 h-[54px] rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-900 dark:hover:bg-zinc-100 transition-all shadow-lg shadow-zinc-200 dark:shadow-none overflow-hidden group block"
                >
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <div className="h-[54px] flex items-center justify-center space-x-2">
                      <span>Featured Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="h-[54px] flex items-center justify-center space-x-2 text-white dark:text-black">
                      <span>Featured Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </Magnetic>
              <Magnetic>
                <button 
                  onClick={() => setIsWidgetOpen(true)}
                  onMouseEnter={onMouseEnterLink}
                  onMouseLeave={onMouseLeaveLink}
                  className="px-8 h-[54px] rounded-full border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-905 transition-all overflow-hidden group block text-left cursor-pointer"
                >
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <div className="h-[54px] flex items-center justify-center space-x-2">
                      <span>Get in Touch</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-650" />
                    </div>
                    <div className="h-[54px] flex items-center justify-center space-x-2 text-black dark:text-white">
                      <span>Get in Touch</span>
                      <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                    </div>
                  </div>
                </button>
              </Magnetic>
            </ScrollReveal>
          </div>

          {/* Profile Card Area - Integrates mind-blowing 3D Interactive Parallax & Spring elastic bounce entry */}
          <div className="lg:col-span-5 flex justify-center">
            <ProfileCard3D 
              onMouseEnter={onMouseEnterProfile}
              onMouseLeave={onMouseLeaveProfile}
            />
          </div>

        </div>
      </section>

      {/* Dedicated About Section - Centered, Large Typography & Mask Staggered Reveal Animation */}
      <section id="about" className="py-32 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/10 dark:bg-zinc-900/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-8">
          <ScrollReveal className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-extrabold">Who I Am</h2>
          </ScrollReveal>
          
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white leading-[1.15] max-w-5xl">
            <div className="block py-1.5">
              <TextReveal text="Hi, I'm Latreche Yasser." />
            </div>
            <div className="block py-1.5">
              <TextReveal text="A passionate Full-Stack Web Developer" className="text-zinc-400 dark:text-zinc-500" delay={150} />
            </div>
            <div className="block py-1.5">
              <TextReveal text="based in Algeria. 📍" delay={300} />
            </div>
          </h3>
        </div>
      </section>

      {/* Tech Stack Bento Grid */}
      <section id="skills" className="py-24 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/20">
        <div className="max-w-6xl mx-auto space-y-16 px-6">
          
          <ScrollReveal className="space-y-3 text-center max-w-xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-extrabold">Architecture & Tools</h2>
            <h3 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
              <div className="block py-1">
                <TextReveal text="Our technical" />
              </div>
              <div className="block py-1">
                <TextReveal text="capability & tools." className="text-zinc-400 dark:text-zinc-500" delay={100} />
              </div>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              We select robust languages and cloud ecosystems to solve enterprise workflow puzzles.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techCategories.map((cat, idx) => (
              <ScrollReveal 
                key={idx} 
                delay={idx * 100}
                className="p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-6 shadow-sm"
                onMouseEnter={onMouseEnterLink}
                onMouseLeave={onMouseLeaveLink}
              >
                <h4 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center justify-between">
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-555 font-mono">{cat.skills.length} tools</span>
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {cat.skills.map((skill, sIdx) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={sIdx}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-100/50 dark:border-zinc-800/50 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-100/80 dark:border-zinc-800/80 group-hover:scale-110 transition-transform shadow-sm">
                          <IconComponent />
                        </div>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-28 px-6 max-w-6xl mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-550 font-extrabold">Our Production</h2>
            <h3 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
              <div className="block py-1">
                <TextReveal text="Selected work &" />
              </div>
              <div className="block py-1">
                <TextReveal text="recent projects." className="text-zinc-400 dark:text-zinc-550" delay={100} />
              </div>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md">
              A comprehensive showcase of deployed platforms and offline ERP POS architectures.
            </p>
          </div>

          {/* Category Tabs */}
          <ScrollReveal 
            className="flex flex-wrap gap-1 p-1 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 w-fit"
            onMouseEnter={onMouseEnterLink}
            onMouseLeave={onMouseLeaveLink}
          >
            {[
              { id: 'all', label: 'All Work' },
              { id: 'saas', label: 'SaaS' },
              { id: 'ecommerce', label: 'E-Commerce' },
              { id: 'desktop', label: 'Desktop ERP' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, pIdx) => (
            <ScrollReveal 
              key={project.id}
              delay={pIdx * 100}
              className={`rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg ${
                project.featured ? 'md:col-span-2 bg-zinc-50/30 dark:bg-zinc-900/10' : ''
              }`}
              onMouseEnter={onMouseEnterProject}
              onMouseLeave={onMouseLeaveProject}
            >
              <div className="p-8 space-y-6">
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">{project.subtitle}</span>
                    <h4 className="text-3xl font-extrabold text-black dark:text-white mt-1.5 transition-colors">
                      {project.title}
                    </h4>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-normal">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3 py-1 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-405"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-8 py-5 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-550">Production Build</span>
                {project.url !== "#" ? (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:underline group"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-400 dark:text-zinc-550">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-550" />
                    <span>Client System Active</span>
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>

      {/* Capabilities Section */}
      <section id="services" className="py-24 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          
          <div className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-extrabold">What We Do</h2>
            <h3 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
              <div className="block py-1">
                <TextReveal text="Our specialized" />
              </div>
              <div className="block py-1">
                <TextReveal text="services & model." className="text-zinc-400 dark:text-zinc-500" delay={100} />
              </div>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <ScrollReveal 
              className="space-y-4"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-black dark:text-white uppercase tracking-widest">Websites & E-Commerce</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Crafting high-converting online stores, fast checkout flows, and sleek corporate websites tailored to grow your digital presence and boost direct sales.
              </p>
            </ScrollReveal>

            <ScrollReveal 
              delay={100}
              className="space-y-4"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-black dark:text-white uppercase tracking-widest">SaaS Engineering</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                We design and coordinate database relationships, secure authentication layers, scalable APIs, and fully responsive user dashboards from scratch.
              </p>
            </ScrollReveal>

            <ScrollReveal 
              delay={200}
              className="space-y-4"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-black dark:text-white uppercase tracking-widest">Desktop ERP & POS</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Custom-built desktop apps for stores, pharmacies, or private schools. Optimized for fast offline database operations, receipt printing, and cashier productivity.
              </p>
            </ScrollReveal>

            <ScrollReveal 
              delay={300}
              className="space-y-4"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
            >
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white shadow-sm">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-black dark:text-white uppercase tracking-widest">Thoughtful Design</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                We believe in minimalist aesthetics, maximum negative space, zero visual noise, and micro-interactions that make navigating a pleasure.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <ScrollReveal className="space-y-4">
            <h3 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
              <div className="block py-1">
                <TextReveal text="Frequently Asked" />
              </div>
              <div className="block py-1">
                <TextReveal text="Questions" className="text-zinc-400 dark:text-zinc-505" delay={100} />
              </div>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
              Got questions? I've got answers to help you get started.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <ScrollReveal 
                key={idx}
                delay={idx * 80}
                className="border-b border-zinc-100 dark:border-zinc-800/80 pb-2"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  onMouseEnter={onMouseEnterLink}
                  onMouseLeave={onMouseLeaveLink}
                  className="w-full flex items-center justify-between py-6 text-left text-black dark:text-white group transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold tracking-tight pr-4">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-4xl mx-auto text-center space-y-10">
        <ScrollReveal className="space-y-4">
          <h3 className="text-4xl sm:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
            <div className="block py-1">
              <TextReveal text="Have a project" />
            </div>
            <div className="block py-1">
              <TextReveal text="in your mind?" className="text-zinc-400 dark:text-zinc-505" delay={100} />
            </div>
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
            Get in touch to construct your ideas.
          </p>
        </ScrollReveal>

        {/* Contact Action Buttons */}
        <ScrollReveal className="pt-6 flex flex-wrap justify-center gap-4" delay={200}>
          <Magnetic>
            <a 
              href="https://github.com/latrecheyasser1-hue" 
              target="_blank" 
              rel="noreferrer"
              onMouseEnter={onMouseEnterLink}
              onMouseLeave={onMouseLeaveLink}
              className="px-8 h-[54px] rounded-full border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all overflow-hidden group block"
            >
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <div className="h-[54px] flex items-center justify-center space-x-2">
                  <TechIcons.GitHub />
                  <span>GitHub Profile</span>
                </div>
                <div className="h-[54px] flex items-center justify-center space-x-2 text-black dark:text-white">
                  <TechIcons.GitHub />
                  <span>GitHub Profile</span>
                </div>
              </div>
            </a>
          </Magnetic>
        </ScrollReveal>

        <ScrollReveal className="pt-24 border-t border-zinc-150 dark:border-zinc-800 text-zinc-400 dark:text-zinc-555 text-[10px] tracking-widest uppercase font-bold flex flex-col sm:flex-row items-center justify-between gap-4" delay={300}>
          <p>© {new Date().getFullYear()} Latreche Yasser. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#hero" onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink} className="hover:text-black dark:hover:text-white transition-colors">Home</a>
            <a href="#about" onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink} className="hover:text-black dark:hover:text-white transition-colors">About</a>
            <a href="#skills" onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink} className="hover:text-black dark:hover:text-white transition-colors">Tech Stack</a>
            <a href="#projects" onMouseEnter={onMouseEnterLink} onMouseLeave={onMouseLeaveLink} className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
          </div>
        </ScrollReveal>
      </section>

      {/* Floating Chat Widget Panel & Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        
        {/* Expanded Chat Widget with glassmorphic look */}
        {isWidgetOpen && (
          <div className="w-[330px] rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 animate-navbar-load">
            
            {/* Header */}
            <div className="px-5 py-4 bg-black dark:bg-zinc-950 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-extrabold">Contact Yasser</h4>
                  <p className="text-[9px] text-zinc-400 dark:text-zinc-500">Response in a few hours</p>
                </div>
              </div>
              <button 
                onClick={() => setIsWidgetOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-zinc-400 hover:text-white" />
              </button>
            </div>

            {/* Success screen */}
            {widgetSuccess ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mt-2">Message Sent!</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[200px] mx-auto leading-relaxed">
                  {widgetMethod === 'whatsapp' 
                    ? "Redirecting to WhatsApp to send your pre-filled text..." 
                    : "Your message has been sent directly to Yasser's inbox."}
                </p>
              </div>
            ) : (
              // Form screen
              <form onSubmit={handleWidgetSubmit} className="p-5 space-y-4">
                
                {/* Method selector toggle tabs */}
                <div className="grid grid-cols-2 p-1 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setWidgetMethod('whatsapp')}
                    className={`py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      widgetMethod === 'whatsapp'
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setWidgetMethod('email')}
                    className={`py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      widgetMethod === 'email'
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                        : 'text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    Direct Email
                  </button>
                </div>

                {/* Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Lamine"
                      value={widgetData.name}
                      onChange={(e) => setWidgetData({ ...widgetData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-650 focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">
                      {widgetMethod === 'whatsapp' ? 'Phone / Email' : 'Your Email'}
                    </label>
                    <input
                      type={widgetMethod === 'whatsapp' ? 'text' : 'email'}
                      placeholder={widgetMethod === 'whatsapp' ? 'e.g., 0550123456' : 'e.g., you@domain.com'}
                      value={widgetData.email}
                      onChange={(e) => setWidgetData({ ...widgetData, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-650 focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mb-1">Message</label>
                    <textarea
                      placeholder="Type your message..."
                      rows="3"
                      value={widgetData.message}
                      onChange={(e) => setWidgetData({ ...widgetData, message: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-650 focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-zinc-100 dark:shadow-none"
                >
                  <span>{widgetMethod === 'whatsapp' ? 'Open WhatsApp' : 'Send Automatic Email'}</span>
                  <SendHorizontal className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* Floating trigger button with magnetic pull */}
        <Magnetic>
          <button
            onClick={() => setIsWidgetOpen(!isWidgetOpen)}
            onMouseEnter={onMouseEnterButton}
            onMouseLeave={onMouseLeaveButton}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer border ${
              isWidgetOpen 
                ? 'bg-white dark:bg-zinc-900 text-black dark:text-white border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800' 
                : 'bg-black dark:bg-white text-white dark:text-black border-transparent hover:bg-zinc-900 dark:hover:bg-zinc-100'
            }`}
          >
            {isWidgetOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <MessageSquare className="w-5 h-5 animate-pulse" />
            )}
          </button>
        </Magnetic>

      </div>

    </div>
  );
}
