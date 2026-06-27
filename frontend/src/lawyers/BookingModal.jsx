import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { lawyerService } from '../../services/lawyerService';
import Modal from '../UI/Modal';
import Input from '../UI/input';
import Button from '../UI/Button';
import Spinner from '../UI/spinner';

export default function BookingModal({ isOpen, onClose, lawyerName, specialty, lawyerId }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [issueType, setIssueType] = useState(specialty || 'General Practice');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  // Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateField = (field, value) => {
    let err = '';
    if (field === 'name') {
      if (!value.trim()) err = 'Full name is required';
    } else if (field === 'email') {
      if (!value) {
        err = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        err = 'Please enter a valid email address';
      }
    } else if (field === 'phone') {
      if (!value) {
        err = 'Phone number is required';
      } else if (!/^\+?[0-9\s\-()]{10,15}$/.test(value)) {
        err = 'Please enter a valid phone number (10-15 digits)';
      }
    } else if (field === 'description') {
      if (!value.trim()) {
        err = 'Situation description is required';
      } else if (value.trim().length < 20) {
        err = 'Please describe your situation in at least 20 characters';
      }
    } else if (field === 'dateTime') {
      if (!value) err = 'Preferred date and time are required';
    }
    return err;
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  // Check overall form validity
  const isFormValid = () => {
    const fields = { name, email, phone, description, dateTime };
    const newErrors = {};
    let valid = true;

    Object.keys(fields).forEach((key) => {
      const err = validateField(key, fields[key]);
      if (err) {
        newErrors[key] = err;
        valid = false;
      }
    });

    return { valid, newErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = isFormValid();
    
    if (!valid) {
      setErrors(newErrors);
      setTouched(
        Object.keys(newErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }

    setLoading(true);
    setApiError('');

    const bookingData = {
      lawyerId,
      lawyerName,
      name,
      email,
      phone,
      issueType,
      description,
      dateTime,
    };

    try {
      await lawyerService.bookConsultation(bookingData);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Something went wrong sending your request. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    // Clear Form fields
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    setDateTime('');
    setErrors({});
    setTouched({});
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={success ? handleCloseSuccess : onClose}
      title={success ? '' : `Book a consultation with ${lawyerName}`}
      className="max-h-[90vh]"
    >
      {success ? (
        /* Success State */
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 select-none font-sans">
          <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center text-white shadow-md animate-scaleUp">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif-display text-xl font-bold text-ink">
              Consultation request sent
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
              We've emailed a confirmation to <strong className="text-ink font-semibold">{email}</strong>.<br />
              {lawyerName} will reach out to you within 24 hours.
            </p>
          </div>

          <Button 
            onClick={handleCloseSuccess}
            variant="primary"
            className="px-6 py-2.5 shadow-sm text-sm"
          >
            Back to directory
          </Button>
        </div>
      ) : (
        /* Form State */
        <form onSubmit={handleSubmit} className="space-y-4 text-sans relative">
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-card/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-2">
              <Spinner size="md" />
              <span className="text-xs text-muted font-sans font-medium">Sending booking request...</span>
            </div>
          )}

          {apiError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-error rounded font-medium">
              {apiError}
            </div>
          )}

          <Input
            label="Your name"
            type="text"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value, setName)}
            onBlur={() => handleBlur('name', name)}
            error={touched.name && errors.name}
            placeholder="e.g. Rohan Sharma"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your email"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value, setEmail)}
              onBlur={() => handleBlur('email', email)}
              error={touched.email && errors.email}
              placeholder="e.g. you@email.com"
              required
            />
            <Input
              label="Your phone number"
              type="tel"
              value={phone}
              onChange={(e) => handleInputChange('phone', e.target.value, setPhone)}
              onBlur={() => handleBlur('phone', phone)}
              error={touched.phone && errors.phone}
              placeholder="e.g. 9876543210"
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5 w-full">
            <label className="text-xs font-medium text-ink font-sans">
              Type of issue <span className="text-error">*</span>
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full h-11 px-3 bg-white border border-border rounded font-sans text-sm text-ink outline-none cursor-pointer focus:ring-3 focus:ring-accent/20 focus:border-accent"
            >
              <option value="Criminal Defence">Criminal Defence</option>
              <option value="Property Disputes">Property Disputes</option>
              <option value="Family Law">Family Law</option>
              <option value="Labour Law">Labour Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="General Practice">General Practice</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1.5 w-full">
            <label className="text-xs font-medium text-ink font-sans">
              Briefly describe your situation <span className="text-error">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => handleInputChange('description', e.target.value, setDescription)}
              onBlur={() => handleBlur('description', description)}
              placeholder="Provide a brief summary of the incident or conflict so the advocate has context..."
              className={`w-full p-3 bg-white border rounded font-sans text-sm text-ink outline-none transition-all placeholder:text-muted/60 resize-none
                ${touched.description && errors.description 
                  ? 'border-error focus:ring-3 focus:ring-error/20 focus:border-error' 
                  : 'border-border focus:ring-3 focus:ring-accent/20 focus:border-accent'
                }
              `}
            />
            {touched.description && errors.description && (
              <span className="text-xs font-medium text-error font-sans">
                {errors.description}
              </span>
            )}
          </div>

          <Input
            label="Preferred date and time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => handleInputChange('dateTime', e.target.value, setDateTime)}
            onBlur={() => handleBlur('dateTime', dateTime)}
            error={touched.dateTime && errors.dateTime}
            required
          />

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              className="shadow-sm"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
