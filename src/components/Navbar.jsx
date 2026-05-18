import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import githubIcon from '../assets/github-mark-white.svg'
import logo from '../assets/logo2.png'
import SearchBar from './SearchBar'

const bounceTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 15,
}

const topVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
}
const middleVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
}
const bottomVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
}

const menuVariants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.08,
    },
  },
}

const menuItemVariants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 },
}

const Line = ({ variants }) => (
  <motion.div
    className="h-0.5 w-5 bg-slate-300"
    variants={variants}
    transition={bounceTransition}
  />
)

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const algorithmLinks = [
    { name: 'Search', href: '/search' },
    { name: 'Shortest Path', href: '/spath' },
    { name: 'Sort', href: '/sort' },
    { name: 'Abstract Data Types', href: '/adt' },
    { name: 'Array Search', href: '/ldssearch' },
    { name: "Kadane's Algorithm", href: '/kadane' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 rounded-xl shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex flex-row text-xl font-semibold tracking-tight group"
          >
            <div className="w-10 h-10 m-auto rounded flex items-center justify-center mr-3 transition-transform group-hover:scale-110">
              <img src={logo} alt="AlgoScope Logo" className="w-8 h-8" />
            </div>
            <span className="mt-1 text-2xl text-white font-bold tracking-tighter">
              AlgoScope
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center max-w-xs mx-4">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              <li className="relative group">
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Explore
                </button>

                <div className="absolute left-0 top-12 py-2 invisible opacity-0 translate-y-2 min-w-[220px] rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 z-50">
                  {algorithmLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block rounded-lg px-4 py-2 text-sm transition-all ${
                        pathname === link.href
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>

            <Link
              to="https://github.com/algoscope-hq/AlgoScope"
              className="inline-flex items-center rounded-xl bg-white px-5 py-2 text-sm font-bold text-black shadow-lg hover:bg-slate-200 transition-all duration-200 active:scale-95"
            >
              <img
                src={githubIcon}
                alt="Github Repository Link"
                className="w-5 h-5 mr-2 invert"
              />
              <span>Github</span>
            </Link>

            {/* ✅ Desktop Auth - FIXED */}
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition-all">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              animate={open ? 'open' : 'closed'}
              className="inline-flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-slate-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
            >
              <Line variants={topVariants} />
              <Line variants={middleVariants} />
              <Line variants={bottomVariants} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="md:hidden border-t border-white/5 bg-slate-950/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] rounded-b-2xl overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              {/* Mobile Search */}
              <div className="mb-6">
                <SearchBar />
              </div>

              <ul className="space-y-2">
                {algorithmLinks.map((link) => (
                  <motion.li key={link.name} variants={menuItemVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        pathname === link.href
                          ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40 font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* ✅ Mobile Auth - FIXED (no duplicates) */}
              <motion.div
                variants={menuItemVariants}
                className="mt-6 flex flex-col gap-3"
              >
                <Link
                  to="https://github.com/algoscope-hq/AlgoScope"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-base font-bold text-white shadow-lg hover:bg-white/10 transition-all active:scale-95"
                >
                  Github
                </Link>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white hover:bg-indigo-400 transition-all"
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}