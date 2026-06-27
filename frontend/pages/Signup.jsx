import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import Button from '../src/UI/Button';
import Input from '../src/UI/input';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }
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
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await authService.signup(name, email, password);
      // Save in state store (and localStorage)
      loginStore(response.user);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface font-sans">
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
              Create an account
            </h2>
            <p className="text-muted text-xs">
              Access AI-driven evaluations and connect with advocates.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {apiError && (
              <div className="p-3 text-xs bg-red-50 border border-red-200 text-error rounded font-medium">
                {apiError}
              </div>
            )}

            <Input
              label="Full name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              placeholder="e.g. Rohan Sharma"
              required
            />

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
              placeholder="Min. 6 characters"
              required
            />

            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="Re-enter password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full h-11"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-accent font-semibold hover:underline">
                Log in
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
