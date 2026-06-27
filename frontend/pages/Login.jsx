import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Button from '../src/UI/Button';
import Input from '../src/UI/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const loginStore = useAuthStore((state) => state.login);

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      const response = await authService.login(email, password);
      // Save in state store (and localStorage)
      loginStore(response.user);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans page-fade">
      {/* Left Panel: Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-[360px] space-y-8 bg-card border border-border p-8 rounded-md shadow-card">
          {/* Logo */}
          <div className="space-y-2">
            <Link to="/" className="flex items-center space-x-2 w-fit">
              <span className="font-semibold text-lg tracking-tight text-ink">LexBridge</span>
              <span className="text-accent text-lg">⚖</span>
            </Link>
            <h2 className="text-2xl font-serif-display font-semibold text-ink pt-2">
              Welcome back
            </h2>
            <p className="text-muted text-xs">
              Log in to access your dashboard and consultations.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {apiError && (
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-error rounded font-medium">
                {apiError}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="e.g. you@email.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Split Quote Visual (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-accent-light items-center justify-center p-12 border-l border-border select-none">
        <div className="max-w-md space-y-6">
          <blockquote className="font-serif-display text-3xl italic leading-relaxed text-accent">
            "The law is a system built by people. Let's help you navigate it."
          </blockquote>
          <cite className="block text-xs font-semibold uppercase tracking-wider text-accent/80 font-sans not-italic">
            — The LexBridge Team
          </cite>
        </div>
      </div>
    </div>
  );
}
