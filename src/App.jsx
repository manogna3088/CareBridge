import { useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronDown, Clock3, Compass, Filter, Heart, Leaf, MapPin, Menu,
  Search, ShieldCheck, Sparkles, Sprout, Users, Utensils, X, BookOpen,
  HandHeart, MapPinned, CircleCheck, Plus, SlidersHorizontal
} from 'lucide-react'

const categories = ['All opportunities', 'Environment', 'Education', 'Food support', 'Community']

const initialEvents = [
  {
    id: 1, title: 'Plant a little hope', org: 'GreenSteps Foundation',
    category: 'Environment', date: 'Sat, Oct 17', time: '8:30 AM – 11:30 AM',
    location: 'Indira Gandhi Park, Vijayawada', distance: '2.4 km away',
    volunteers: '12 spots left', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
    description: 'Help restore a local green space by planting native saplings and learning simple ways to care for them. Tools and guidance are provided.',
    icon: Sprout, color: 'green', featured: true,
  },
  {
    id: 2, title: 'A meal, a moment of care', org: 'Share A Meal Collective',
    category: 'Food support', date: 'Sun, Oct 18', time: '10:00 AM – 1:00 PM',
    location: 'One Town Community Hall, Vijayawada', distance: '3.1 km away',
    volunteers: '8 spots left', image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85',
    description: 'Prepare and distribute meal kits with a friendly local team. Volunteers help pack food, organize supplies, and welcome community members.',
    icon: Utensils, color: 'orange', featured: true,
  },
  {
    id: 3, title: 'Small lessons, big futures', org: 'BrightPath Learning',
    category: 'Education', date: 'Sat, Oct 24', time: '9:00 AM – 12:00 PM',
    location: 'Patamata Learning Centre, Vijayawada', distance: '4.6 km away',
    volunteers: '5 spots left', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85',
    description: 'Support school-age learners with reading, basic maths, and fun learning activities. Teaching experience is welcome but not required.',
    icon: BookOpen, color: 'blue', featured: true,
  },
  {
    id: 4, title: 'A cleaner corner of our city', org: 'Our Streets Initiative',
    category: 'Community', date: 'Sun, Oct 25', time: '7:30 AM – 10:00 AM',
    location: 'Benz Circle, Vijayawada', distance: '5.2 km away',
    volunteers: '18 spots left', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=85',
    description: 'Join neighbours for a community clean-up. Help collect litter, sort recyclable materials, and make shared public spaces more welcoming.',
    icon: HandHeart, color: 'purple', featured: false,
  },
]

function Logo() {
  return <a className="brand" href="#home" aria-label="CareBridge home">
    <span className="brand-mark"><HandHeart size={22} strokeWidth={2.1} /></span>
    <span>carebridge<span className="brand-dot">.</span></span>
  </a>
}

function Header({ onExplore, onLogin, onVolunteer }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className="site-header">
    <div className="header-inner container">
      <Logo />
      <button className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#opportunities" onClick={(e) => { e.preventDefault(); onExplore(); setMenuOpen(false) }}>Explore opportunities</a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Our impact</a>
        <div className="mobile-nav-actions">
          <button className="button button-ghost" onClick={onLogin}>Log in</button>
          <button className="button button-primary" onClick={onVolunteer}>Join as a volunteer <ArrowRight size={16}/></button>
        </div>
      </nav>
      <div className="header-actions">
        <button className="button button-ghost" onClick={onLogin}>Log in</button>
        <button className="button button-primary button-small" onClick={onVolunteer}>Join as a volunteer <ArrowUpRight size={16}/></button>
      </div>
    </div>
  </header>
}

function EventCard({ event, onDetails, onApply, applied }) {
  const Icon = event.icon
  return <article className="event-card">
    <div className="event-image-wrap">
      <img className="event-image" src={event.image} alt="" loading="lazy" />
      <span className={`category-pill ${event.color}`}><Icon size={13}/>{event.category}</span>
      <button className="save-button" aria-label={`Save ${event.title}`} title="Save opportunity"><Heart size={17}/></button>
    </div>
    <div className="event-content">
      <div className="event-org">{event.org}</div>
      <h3>{event.title}</h3>
      <div className="event-meta"><CalendarDays size={15}/><span>{event.date}</span><span className="meta-dot">·</span><Clock3 size={15}/><span>{event.time.split(' – ')[0]}</span></div>
      <div className="event-location"><MapPin size={15}/><span>{event.location}</span></div>
      <div className="event-card-bottom">
        <span className="spots"><span className="spots-dot"/>{event.volunteers}</span>
        <button className="text-button" onClick={() => onDetails(event)}>View details <ArrowRight size={15}/></button>
      </div>
      {applied && <div className="applied-note"><CircleCheck size={14}/> Application noted on this demo</div>}
    </div>
  </article>
}

function EventModal({ event, onClose, onApply, applied }) {
  if (!event) return null
  const Icon = event.icon
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <section className="event-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close icon-button" onClick={onClose} aria-label="Close details"><X size={20}/></button>
      <img src={event.image} alt="" className="modal-image"/>
      <div className="modal-body">
        <span className={`category-pill ${event.color}`}><Icon size={13}/>{event.category}</span>
        <p className="event-org modal-org">{event.org}</p>
        <h2 id="modal-title">{event.title}</h2>
        <p className="modal-description">{event.description}</p>
        <div className="detail-list">
          <div><CalendarDays size={18}/><span><strong>{event.date}</strong><small>{event.time}</small></span></div>
          <div><MapPin size={18}/><span><strong>Meeting point</strong><small>{event.location}</small></span></div>
          <div><Users size={18}/><span><strong>{event.volunteers}</strong><small>Availability listed by organizer</small></span></div>
        </div>
        <button className="button button-primary button-wide" onClick={() => onApply(event.id)}>
          {applied ? <><Check size={17}/> Applied in demo</> : <>Apply to volunteer <ArrowRight size={17}/></>}
        </button>
        <p className="demo-note">Demo interaction only. Applications are not sent to an organization yet.</p>
      </div>
    </section>
  </div>
}

function AuthModal({ mode, onClose, onSwitch }) {
  const [role, setRole] = useState('volunteer')
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  if (!mode) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <section className="auth-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="modal-close icon-button" onClick={onClose} aria-label="Close"><X size={20}/></button>
      <div className="auth-icon"><HandHeart size={25}/></div>
      <p className="eyebrow">WELCOME TO CAREBRIDGE</p>
      <h2 id="auth-title">{mode === 'login' ? 'Welcome back' : 'Make good happen'}</h2>
      <p className="auth-subtitle">{mode === 'login' ? 'Continue your journey of making a difference.' : 'Create your demo account to explore the experience.'}</p>
      {submitted ? <div className="success-panel"><CircleCheck size={28}/><strong>You're all set for this demo!</strong><span>This form is a frontend prototype. Authentication will be connected in a later step.</span><button className="button button-primary button-wide" onClick={onClose}>Got it</button></div> :
      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
        {mode !== 'login' && <div className="role-toggle" aria-label="Choose account type">
          <button type="button" className={role === 'volunteer' ? 'selected' : ''} onClick={() => setRole('volunteer')}><Heart size={15}/> Volunteer</button>
          <button type="button" className={role === 'ngo' ? 'selected' : ''} onClick={() => setRole('ngo')}><Users size={15}/> NGO / organization</button>
        </div>}
        {mode !== 'login' && <label>Full name or organization<input required value={name} onChange={e => setName(e.target.value)} placeholder={role === 'ngo' ? 'Organization name' : 'Your full name'}/></label>}
        <label>Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/></label>
        <label>Password<input required type="password" minLength="6" placeholder="At least 6 characters"/></label>
        <button className="button button-primary button-wide" type="submit">{mode === 'login' ? 'Log in to CareBridge' : 'Create demo account'} <ArrowRight size={17}/></button>
        <p className="auth-switch">{mode === 'login' ? "New to CareBridge?" : 'Already have an account?'} <button type="button" onClick={() => onSwitch(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Join us' : 'Log in'}</button></p>
      </form>}
      <p className="demo-note">Prototype only — no account details are sent or stored.</p>
    </section>
  </div>
}

function App() {
  const [events] = useState(initialEvents)
  const [category, setCategory] = useState('All opportunities')
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [appliedIds, setAppliedIds] = useState([])
  const [authMode, setAuthMode] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesCategory = category === 'All opportunities' || event.category === category
    const haystack = `${event.title} ${event.org} ${event.category} ${event.location} ${event.description}`.toLowerCase()
    const matchesSearch = haystack.includes(search.toLowerCase().trim())
    const matchesLocation = !location.trim() || event.location.toLowerCase().includes(location.toLowerCase().trim())
    return matchesCategory && matchesSearch && matchesLocation
  }), [events, category, search, location])

  const scrollToEvents = () => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })
  const applyToEvent = (id) => {
    setAppliedIds(prev => prev.includes(id) ? prev : [...prev, id])
    setNotice('Your demo application has been noted. Backend submission is not connected yet.')
    setSelectedEvent(null)
    window.setTimeout(() => setNotice(''), 4800)
  }
  const submitSearch = (e) => {
    e.preventDefault()
    scrollToEvents()
  }

  return <div id="home">
    <Header onExplore={scrollToEvents} onLogin={() => setAuthMode('login')} onVolunteer={() => setAuthMode('signup')}/>
    <main>
      <section className="hero-section">
        <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge"><span className="badge-spark"><Sparkles size={13}/></span> SMALL ACTS. MEANINGFUL CHANGE.</div>
            <h1>Make good<br/>happen <span>together.</span></h1>
            <p className="hero-description">Find your people. Give your time. Make a real difference in the community you call home.</p>
            <div className="hero-actions">
              <button className="button button-primary button-large" onClick={scrollToEvents}>Find an opportunity <ArrowRight size={18}/></button>
              <a className="button button-light button-large" href="#how-it-works">How it works <ArrowDownRight size={17}/></a>
            </div>
            <div className="hero-trust">
              <div className="avatar-stack"><span>R</span><span>A</span><span>S</span><span>+</span></div>
              <div><strong>A little time goes a long way</strong><small>Every act of kindness counts.</small></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-photo-main">
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=90" alt="Volunteers working together on a community project"/>
              <div className="photo-label"><span className="photo-label-icon"><HandHeart size={17}/></span><span><strong>Better, together.</strong><small>Community starts with you</small></span></div>
            </div>
            <div className="floating-card impact-float"><span className="float-icon"><Sprout size={18}/></span><span><strong>Grow good things</strong><small>One action at a time</small></span></div>
            <div className="floating-card location-float"><span className="location-icon"><MapPin size={18}/></span><span><strong>Good things nearby</strong><small>Discover your local community</small></span></div>
            <div className="art-spark spark-a">✳</div><div className="art-spark spark-b">✦</div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span><span className="live-dot"/> YOUR COMMUNITY, YOUR IMPACT</span>
          <span>Find a cause that feels like you <ArrowDownRight size={15}/></span>
        </div>
      </section>

      <section className="search-section" aria-label="Find volunteering opportunities">
        <form className="search-panel container" onSubmit={submitSearch}>
          <div className="search-field">
            <Search size={20}/>
            <label><span>What are you interested in?</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try “teaching” or “food support”"/></label>
          </div>
          <div className="search-divider"/>
          <div className="search-field location-search">
            <MapPin size={20}/>
            <label><span>Where?</span><input value={location} onChange={e => setLocation(e.target.value)} placeholder="City or area (e.g. Vijayawada)"/></label>
          </div>
          <button type="submit" className="button button-primary search-submit"><Search size={17}/> Search</button>
        </form>
      </section>

      <section className="section opportunities-section" id="opportunities">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow"><span/> FIND YOUR KIND OF GOOD</p><h2>Good things are<br className="desktop-break"/> <span>happening nearby.</span></h2></div>
            <p className="section-intro">From lending a hand to sharing a skill, there’s a place for you here. Find an opportunity that fits your time and your heart.</p>
          </div>
          <div className="opportunity-toolbar">
            <div className="category-tabs" role="group" aria-label="Filter by category">
              {categories.map(cat => <button key={cat} className={category === cat ? 'category-tab active' : 'category-tab'} onClick={() => {setCategory(cat); setShowAll(false)}}>{cat}</button>)}
            </div>
            <span className="results-count"><SlidersHorizontal size={15}/>{filteredEvents.length} opportunities</span>
          </div>
          {filteredEvents.length ? <div className="events-grid">
            {(showAll ? filteredEvents : filteredEvents.slice(0, 3)).map(event => <EventCard key={event.id} event={event} onDetails={setSelectedEvent} onApply={applyToEvent} applied={appliedIds.includes(event.id)}/>)}
          </div> : <div className="empty-state"><Search size={26}/><h3>No opportunities found</h3><p>Try another keyword, location, or category.</p><button className="button button-outline" onClick={() => {setCategory('All opportunities'); setSearch(''); setLocation('')}}>Clear filters</button></div>}
          {filteredEvents.length > 3 && <div className="section-action"><button className="button button-outline" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer opportunities' : 'Explore all opportunities'} <ArrowRight size={17}/></button></div>}
          <p className="sample-data-note">Sample opportunities for demonstration. Event details and locations are illustrative.</p>
        </div>
      </section>

      <section className="impact-strip" id="about">
        <div className="container impact-inner">
          <div className="impact-copy"><p className="eyebrow light-eyebrow"><span/> THE POWER OF SHOWING UP</p><h2>Big change starts<br/>with <em>one small act.</em></h2><p>Every hour shared, every meal packed, every tree planted brings us closer to a kinder, more connected community.</p><button className="button button-white" onClick={() => setAuthMode('signup')}>Be part of it <ArrowUpRight size={17}/></button></div>
          <div className="impact-points">
            <div className="impact-point"><span className="impact-point-icon"><Users size={21}/></span><div><strong>People-powered</strong><p>Real people, coming together around causes that matter.</p></div></div>
            <div className="impact-point"><span className="impact-point-icon"><MapPinned size={21}/></span><div><strong>Close to home</strong><p>Discover ways to help in your own neighbourhood.</p></div></div>
            <div className="impact-point"><span className="impact-point-icon"><ShieldCheck size={21}/></span><div><strong>Purposeful action</strong><p>Clear event information helps you know what to expect.</p></div></div>
          </div>
          <div className="impact-decoration">✳</div>
        </div>
      </section>

      <section className="section how-section" id="how-it-works">
        <div className="container">
          <div className="center-heading"><p className="eyebrow"><span/> YOUR JOURNEY STARTS HERE</p><h2>Good is easier <span>together.</span></h2><p>Three simple steps to turn your good intentions into real-world impact.</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><div className="step-icon mint"><Compass size={24}/></div><h3>Find your cause</h3><p>Explore opportunities that match your interests, skills, and availability.</p><span className="step-bottom">DISCOVER <ArrowUpRight size={14}/></span></article>
            <article className="step-card featured-step"><span className="step-number">02</span><div className="step-icon peach"><CalendarDays size={24}/></div><h3>Show up & help</h3><p>Choose an activity, check the details, and apply to lend a hand.</p><span className="step-bottom">TAKE PART <ArrowUpRight size={14}/></span></article>
            <article className="step-card"><span className="step-number">03</span><div className="step-icon blue-soft"><Heart size={24}/></div><h3>Make it matter</h3><p>Meet your community, share your time, and help make change happen.</p><span className="step-bottom">MAKE AN IMPACT <ArrowUpRight size={14}/></span></article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-box">
          <div className="cta-flower">✳</div>
          <div><p className="eyebrow light-eyebrow">THERE'S A PLACE FOR YOU HERE</p><h2>Your time can<br/>change <em>someone's day.</em></h2><p>Start with one opportunity. See where it takes you.</p></div>
          <button className="button button-white button-large" onClick={scrollToEvents}>Find your first opportunity <ArrowRight size={18}/></button>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand"><Logo/><p>Connecting people with purpose.<br/>Building a kinder community, one act at a time.</p></div>
        <div className="footer-links"><strong>Explore</strong><a href="#opportunities">Opportunities</a><a href="#how-it-works">How it works</a><a href="#about">Our impact</a></div>
        <div className="footer-links"><strong>Get involved</strong><button onClick={() => setAuthMode('signup')}>Volunteer with us</button><button onClick={() => {setAuthMode('signup')}}>Partner as an NGO</button><button onClick={() => setAuthMode('login')}>Sign in</button></div>
        <div className="footer-note"><span className="footer-heart"><Heart size={17}/></span><strong>Good things happen<br/>when we show up.</strong><small>Made for communities, by community-minded people.</small></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 CareBridge · Team Aurora</span><span>Community Volunteering Portal <span className="footer-dot">•</span> Project prototype</span></div>
    </footer>

    {notice && <div className="toast" role="status"><CircleCheck size={18}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}
    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onApply={applyToEvent} applied={selectedEvent ? appliedIds.includes(selectedEvent.id) : false}/>
    <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitch={setAuthMode}/>
  </div>
}

export default App
