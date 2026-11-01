import React, { useState, useEffect, useRef } from 'react';
import { InquiryFormData, ServiceType, SiteConfig } from '../types';
import { SERVICE_LABELS } from '../data/config';

interface InquiryFormProps {
  siteConfig: SiteConfig;
  preselectedService?: ServiceType | null;
  onClearPreselectedService?: () => void;
  onShowToast: (message: string) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  siteConfig,
  preselectedService,
  onClearPreselectedService,
  onShowToast
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    serviceLabel: '',
    description: '',
    budget: '',
    currency: siteConfig.defaultCurrency || 'USD',
    budgetUnsure: false,
    timeline: '',
    designDeliverables: [],
    brandStatus: '',
    platforms: [],
    campaignStatus: '',
    goals: '',
    unclearNeeds: '',
    contactMethod: 'Email',
    phone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorSummaryVisible, setErrorSummaryVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefillNote, setPrefillNote] = useState<string | null>(null);

  // Result state
  const [resultState, setResultState] = useState<{
    show: boolean;
    confirmed: boolean;
    reason: 'confirmed' | 'not-configured' | 'error';
    summaryText: string;
  }>({
    show: false,
    confirmed: false,
    reason: 'not-configured',
    summaryText: ''
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultTitleRef = useRef<HTMLHeadingElement>(null);

  // Handle service preselection from external buttons
  useEffect(() => {
    if (preselectedService && SERVICE_LABELS[preselectedService]) {
      setFormData(prev => ({
        ...prev,
        service: preselectedService,
        serviceLabel: SERVICE_LABELS[preselectedService]
      }));
      setPrefillNote(
        `${SERVICE_LABELS[preselectedService]} has been preselected for Step 2. You can change it before submitting.`
      );
      setResultState(prev => ({ ...prev, show: false }));
      setStep(1);
      if (onClearPreselectedService) onClearPreselectedService();
    }
  }, [preselectedService, onClearPreselectedService]);

  const updateField = <K extends keyof InquiryFormData>(key: K, value: InquiryFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleCheckboxToggle = (
    key: 'designDeliverables' | 'platforms',
    value: string
  ) => {
    const list = formData[key];
    const exists = list.includes(value);
    const updated = exists ? list.filter(item => item !== value) : [...list, value];
    updateField(key, updated);
  };

  const validateStep = (stepNumber: 1 | 2 | 3): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Please enter your name.';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Please enter your email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address, such as name@example.com.';
      }
    }

    if (stepNumber === 2) {
      if (!formData.service) {
        newErrors.service = 'Please choose the closest service option.';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Please describe the project or challenge.';
      } else if (formData.description.trim().length < 20) {
        newErrors.description = 'Please add a little more context—at least 20 characters.';
      }
      if (!formData.budgetUnsure && formData.budget !== '') {
        const val = Number(formData.budget);
        if (!Number.isFinite(val) || val < 0) {
          newErrors.budget = 'Enter a valid positive amount, or select “Not sure yet.”';
        }
      }
    }

    if (stepNumber === 3) {
      if (!formData.contactMethod) {
        newErrors.contactMethod = 'Please choose a preferred contact method.';
      }
      if (formData.contactMethod === 'WhatsApp' || formData.contactMethod === 'Phone') {
        const digits = formData.phone.replace(/\D/g, '');
        if (!formData.phone.trim()) {
          newErrors.phone = `Please enter a number for your preferred ${formData.contactMethod} contact.`;
        } else if (digits.length < 7 || digits.length > 15) {
          newErrors.phone = 'Please enter a valid number, including the country code where applicable.';
        }
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setErrorSummaryVisible(!isValid);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => (prev < 3 ? ((prev + 1) as 2 | 3) : prev));
      setTimeout(() => {
        if (headingRef.current) headingRef.current.focus();
      }, 50);
    }
  };

  const handleBack = () => {
    setErrors({});
    setErrorSummaryVisible(false);
    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2) : prev));
    setTimeout(() => {
      if (headingRef.current) headingRef.current.focus();
    }, 50);
  };

  const displayList = (values: string[]) => {
    return values.length ? values.join(', ') : 'Not specified';
  };

  const buildSummary = (data: InquiryFormData): string => {
    const sLabel = data.service ? SERVICE_LABELS[data.service as ServiceType] : 'Not specified';
    const budgetStr = data.budgetUnsure
      ? 'Not sure yet'
      : data.budget
      ? `${data.currency} ${Number(data.budget).toLocaleString()}`
      : 'Not specified';

    const lines = [
      'GLOMATIC SPACE® — PROJECT INQUIRY',
      '=================================',
      '',
      'ABOUT YOU',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company / brand: ${data.company || 'Not specified'}`,
      '',
      'PROJECT',
      `Service: ${sLabel}`,
      `Budget: ${budgetStr}`,
      `Timeline: ${data.timeline || 'Not specified'}`,
      '',
      'Project description:',
      data.description,
      ''
    ];

    if (data.service === 'design' || data.service === 'both') {
      lines.push(
        'DESIGN DETAILS',
        `Possible deliverables: ${displayList(data.designDeliverables)}`,
        `Existing brand identity: ${data.brandStatus || 'Not specified'}`,
        ''
      );
    }

    if (data.service === 'marketing' || data.service === 'both') {
      lines.push(
        'MARKETING DETAILS',
        `Platforms: ${displayList(data.platforms)}`,
        `Campaign status: ${data.campaignStatus || 'Not specified'}`,
        `Goals / challenges: ${data.goals || 'Not specified'}`,
        ''
      );
    }

    if (data.service === 'unsure') {
      lines.push('WHAT WOULD HELP MOVE FORWARD', data.unclearNeeds || 'Not specified', '');
    }

    lines.push(
      'PREFERRED CONTACT',
      `Method: ${data.contactMethod}`,
      `Phone / WhatsApp: ${data.phone || 'Not requested'}`,
      '',
      '— Prepared with the Glomatic Space inquiry planner —'
    );

    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all 3 steps
    for (const stepNum of [1, 2, 3] as const) {
      if (!validateStep(stepNum)) {
        setStep(stepNum);
        return;
      }
    }

    const summary = buildSummary(formData);
    setIsSubmitting(true);

    try {
      if (!siteConfig.formEndpoint) {
        setResultState({
          show: true,
          confirmed: false,
          reason: 'not-configured',
          summaryText: summary
        });
      } else {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            ...formData,
            formattedInquiry: summary,
            source: 'Glomatic Space portfolio inquiry'
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`Form service returned HTTP ${response.status}`);
        }

        setResultState({
          show: true,
          confirmed: true,
          reason: 'confirmed',
          summaryText: summary
        });
      }
    } catch {
      setResultState({
        show: true,
        confirmed: false,
        reason: 'error',
        summaryText: summary
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (resultTitleRef.current) resultTitleRef.current.focus();
      }, 50);
    }
  };

  const handleCopy = async () => {
    if (!resultState.summaryText) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(resultState.summaryText);
        onShowToast('Inquiry copied to your clipboard.');
        return;
      }
    } catch {
      // Fallback
    }

    const textArea = document.createElement('textarea');
    textArea.value = resultState.summaryText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      onShowToast('Inquiry copied to your clipboard.');
    } catch {
      onShowToast('Copy was blocked. Select the summary and copy it manually.');
    }
    document.body.removeChild(textArea);
  };

  const handleDownload = () => {
    if (!resultState.summaryText) return;
    const blob = new Blob([resultState.summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const safeName = (formData.name || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || 'project';

    anchor.href = url;
    anchor.download = `glomatic-space-inquiry-${safeName}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    onShowToast('Inquiry text file downloaded.');
  };

  const handleEmailDraft = () => {
    if (!resultState.summaryText) return;
    const recipient = siteConfig.contactEmail.trim().replace(/[\r\n]/g, '');
    const subject = `Project inquiry — ${formData.name}${formData.company ? ` / ${formData.company}` : ''}`;
    const href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      resultState.summaryText
    )}`;
    window.location.href = href;
    onShowToast('Opening a draft. It is not sent until you press Send in your email app.');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      serviceLabel: '',
      description: '',
      budget: '',
      currency: siteConfig.defaultCurrency || 'USD',
      budgetUnsure: false,
      timeline: '',
      designDeliverables: [],
      brandStatus: '',
      platforms: [],
      campaignStatus: '',
      goals: '',
      unclearNeeds: '',
      contactMethod: 'Email',
      phone: ''
    });
    setErrors({});
    setErrorSummaryVisible(false);
    setPrefillNote(null);
    setResultState({
      show: false,
      confirmed: false,
      reason: 'not-configured',
      summaryText: ''
    });
    setStep(1);
  };

  const handleEditAnswers = () => {
    setResultState(prev => ({ ...prev, show: false }));
    setStep(3);
  };

  return (
    <section className="section inquiry" id="inquiry" aria-labelledby="inquiry-title">
      <div className="container inquiry-layout">
        <aside className="inquiry-aside reveal">
          <span className="eyebrow lime">05 / Start a project</span>
          <h2 className="section-heading" id="inquiry-title">
            Tell us what<br /><span className="serif">you’re making.</span>
          </h2>
          <p>
            A useful first brief in three calm steps. Share what you know, leave what you do not, and keep every answer editable as you move.
          </p>
          <ol className="inquiry-promises">
            <li><span>01</span>No payment or commitment.</li>
            <li><span>02</span>Only relevant follow-up questions.</li>
            <li><span>03</span>Clear delivery status—never a false success.</li>
          </ol>
        </aside>

        <div className="form-shell reveal" style={{ ['--delay' as string]: '100ms' }}>
          {!resultState.show ? (
            <>
              <div className="form-top" id="form-top">
                <div className="form-topline">
                  <span>Project inquiry</span>
                  <span id="step-count">Step 0{step} of 03</span>
                </div>
                <div
                  className="progress-track"
                  id="form-progress"
                  role="progressbar"
                  aria-label="Inquiry progress"
                  aria-valuemin={1}
                  aria-valuemax={3}
                  aria-valuenow={step}
                >
                  <span className={`progress-segment ${step >= 1 ? 'is-active' : ''}`} />
                  <span className={`progress-segment ${step >= 2 ? 'is-active' : ''}`} />
                  <span className={`progress-segment ${step >= 3 ? 'is-active' : ''}`} />
                </div>
              </div>

              {prefillNote && (
                <p className="prefill-note" id="prefill-note">
                  {prefillNote}
                </p>
              )}

              <form id="project-form" noValidate onSubmit={handleSubmit}>
                <div className="honeypot" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                  <fieldset className="form-step" data-step="1">
                    <legend className="sr-only">Step 1: About you</legend>
                    <h3 className="step-heading" tabIndex={-1} ref={headingRef}>
                      First, a little about you.
                    </h3>
                    <p className="step-intro">The essentials are enough. Company or brand name is optional.</p>

                    <div className="field-grid">
                      <div className="field">
                        <label htmlFor="name">
                          Your name <span className="required-mark" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          maxLength={100}
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p className="field-error" id="name-error">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="field">
                        <label htmlFor="email">
                          Email address <span className="required-mark" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          maxLength={160}
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p className="field-error" id="email-error">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="field field-full">
                        <label htmlFor="company">
                          Company or brand name <span className="optional">(optional)</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          maxLength={140}
                          value={formData.company}
                          onChange={(e) => updateField('company', e.target.value)}
                        />
                      </div>
                    </div>
                  </fieldset>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <fieldset className="form-step" data-step="2">
                    <legend className="sr-only">Step 2: Project</legend>
                    <h3 className="step-heading" tabIndex={-1} ref={headingRef}>
                      What are we building?
                    </h3>
                    <p className="step-intro">
                      Choose the closest fit. “Both” and “Not Sure Yet” are completely valid starting points.
                    </p>

                    <fieldset className="service-fieldset" id="service-group">
                      <legend>
                        Service needed <span className="required-mark" aria-hidden="true">*</span>
                      </legend>
                      <div className="choice-grid">
                        <label className="choice">
                          <input
                            type="radio"
                            name="service"
                            value="design"
                            checked={formData.service === 'design'}
                            onChange={() => {
                              updateField('service', 'design');
                              updateField('serviceLabel', SERVICE_LABELS.design);
                            }}
                          />
                          <span className="choice-card">
                            <span className="choice-index">01</span>
                            <strong>Graphic Design</strong>
                            <small>Identity, visual systems and creative assets</small>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="service"
                            value="marketing"
                            checked={formData.service === 'marketing'}
                            onChange={() => {
                              updateField('service', 'marketing');
                              updateField('serviceLabel', SERVICE_LABELS.marketing);
                            }}
                          />
                          <span className="choice-card">
                            <span className="choice-index">02</span>
                            <strong>Digital Marketing</strong>
                            <small>Social, content, campaigns and growth planning</small>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="service"
                            value="both"
                            checked={formData.service === 'both'}
                            onChange={() => {
                              updateField('service', 'both');
                              updateField('serviceLabel', SERVICE_LABELS.both);
                            }}
                          />
                          <span className="choice-card">
                            <span className="choice-index">03</span>
                            <strong>Both</strong>
                            <small>A connected identity and marketing scope</small>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="service"
                            value="unsure"
                            checked={formData.service === 'unsure'}
                            onChange={() => {
                              updateField('service', 'unsure');
                              updateField('serviceLabel', SERVICE_LABELS.unsure);
                            }}
                          />
                          <span className="choice-card">
                            <span className="choice-index">04</span>
                            <strong>Not Sure Yet</strong>
                            <small>Start with the challenge and shape the route</small>
                          </span>
                        </label>
                      </div>
                      {errors.service && (
                        <p className="field-error" id="service-error">
                          {errors.service}
                        </p>
                      )}
                    </fieldset>

                    <div className="field">
                      <label htmlFor="description">
                        Project description <span className="required-mark" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        minLength={20}
                        maxLength={1200}
                        required
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="What are you launching, changing or trying to improve? A few sentences are perfect."
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? 'description-error' : 'description-help'}
                      />
                      <p className="field-help" id="description-help">
                        Please use at least 20 characters so there is enough context.
                      </p>
                      <span className="character-count" id="description-count">
                        {formData.description.length} / 1200
                      </span>
                      {errors.description && (
                        <p className="field-error" id="description-error">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="field">
                      <span className="field-label">Estimated budget <span className="optional">(optional)</span></span>
                      <div className={`budget-row ${formData.budgetUnsure ? 'is-unsure' : ''}`} id="budget-row">
                        <label className="sr-only" htmlFor="currency">Budget currency</label>
                        <select
                          id="currency"
                          name="currency"
                          value={formData.currency}
                          disabled={formData.budgetUnsure}
                          onChange={(e) => updateField('currency', e.target.value)}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="INR">INR</option>
                          <option value="AED">AED</option>
                          <option value="CAD">CAD</option>
                          <option value="AUD">AUD</option>
                        </select>
                        <label className="sr-only" htmlFor="budget">Estimated budget amount</label>
                        <input
                          id="budget"
                          name="budget"
                          type="number"
                          min="0"
                          step="any"
                          inputMode="decimal"
                          placeholder="Amount"
                          value={formData.budget}
                          readOnly={formData.budgetUnsure}
                          onChange={(e) => updateField('budget', e.target.value)}
                          aria-invalid={!!errors.budget}
                        />
                      </div>
                      <label className="check-line">
                        <input
                          id="budget-unsure"
                          name="budgetUnsure"
                          type="checkbox"
                          checked={formData.budgetUnsure}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            updateField('budgetUnsure', checked);
                            if (checked) {
                              updateField('budget', '');
                            }
                          }}
                        />{' '}
                        I’m not sure about the budget yet
                      </label>
                      {errors.budget && (
                        <p className="field-error" id="budget-error">
                          {errors.budget}
                        </p>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor="timeline">Preferred timeline <span className="optional">(optional)</span></label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => updateField('timeline', e.target.value)}
                      >
                        <option value="">Select a timeline</option>
                        <option>As soon as possible</option>
                        <option>Within 1 month</option>
                        <option>Within 1–3 months</option>
                        <option>More than 3 months</option>
                        <option>Flexible / not sure yet</option>
                      </select>
                    </div>
                  </fieldset>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <fieldset className="form-step" data-step="3">
                    <legend className="sr-only">Step 3: Project details and contact preference</legend>
                    <h3 className="step-heading" tabIndex={-1} ref={headingRef}>
                      A few useful details.
                    </h3>
                    <p className="step-intro">
                      Everything in this step is optional except your preferred contact method, and a number if you choose WhatsApp or Phone.
                    </p>

                    {/* Conditional: Design Details */}
                    {(formData.service === 'design' || formData.service === 'both') && (
                      <div className="conditional-group" id="design-questions">
                        <h4>Design details</h4>
                        <p>Select anything already on your mind. These answers can change later.</p>
                        <span className="field-label">Possible deliverables</span>
                        <div className="check-pills">
                          {[
                            { value: 'Logo / identity system', label: 'Logo / identity' },
                            { value: 'Art direction', label: 'Art direction' },
                            { value: 'Social media creatives', label: 'Social creatives' },
                            { value: 'Advertising graphics', label: 'Advertising graphics' },
                            { value: 'Campaign design', label: 'Campaign design' },
                            { value: 'Not sure yet', label: 'Not sure yet' }
                          ].map((item) => (
                            <label key={item.value} className="check-pill">
                              <input
                                type="checkbox"
                                name="designDeliverables"
                                value={item.value}
                                checked={formData.designDeliverables.includes(item.value)}
                                onChange={() => handleCheckboxToggle('designDeliverables', item.value)}
                              />
                              <span>{item.label}</span>
                            </label>
                          ))}
                        </div>

                        <div className="field">
                          <label htmlFor="brand-status">
                            Existing brand identity <span className="optional">(optional)</span>
                          </label>
                          <select
                            id="brand-status"
                            name="brandStatus"
                            value={formData.brandStatus}
                            onChange={(e) => updateField('brandStatus', e.target.value)}
                          >
                            <option value="">Select what applies</option>
                            <option>Starting from scratch</option>
                            <option>Existing identity needs to evolve</option>
                            <option>Brand guidelines are already in place</option>
                            <option>Not sure yet</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Conditional: Marketing Details */}
                    {(formData.service === 'marketing' || formData.service === 'both') && (
                      <div className="conditional-group" id="marketing-questions">
                        <h4>Marketing details</h4>
                        <p>Choose only the channels or campaign details relevant right now.</p>
                        <span className="field-label">Platforms being considered</span>
                        <div className="check-pills">
                          {[
                            'Instagram',
                            'LinkedIn',
                            'Facebook',
                            'YouTube',
                            'TikTok',
                            'Google / paid search',
                            'Not sure yet'
                          ].map((platform) => (
                            <label key={platform} className="check-pill">
                              <input
                                type="checkbox"
                                name="platforms"
                                value={platform}
                                checked={formData.platforms.includes(platform)}
                                onChange={() => handleCheckboxToggle('platforms', platform)}
                              />
                              <span>{platform}</span>
                            </label>
                          ))}
                        </div>

                        <div className="field">
                          <label htmlFor="campaign-status">
                            Campaign status <span className="optional">(optional)</span>
                          </label>
                          <select
                            id="campaign-status"
                            name="campaignStatus"
                            value={formData.campaignStatus}
                            onChange={(e) => updateField('campaignStatus', e.target.value)}
                          >
                            <option value="">Select what applies</option>
                            <option>Planning a first campaign</option>
                            <option>Existing campaigns need improvement</option>
                            <option>Looking for ongoing content support</option>
                            <option>Not running campaigns yet</option>
                            <option>Not sure yet</option>
                          </select>
                        </div>

                        <div className="field">
                          <label htmlFor="goals">
                            Goals or challenges <span className="optional">(optional)</span>
                          </label>
                          <textarea
                            id="goals"
                            name="goals"
                            maxLength={800}
                            value={formData.goals}
                            onChange={(e) => updateField('goals', e.target.value)}
                            placeholder="For example: clearer positioning, a more consistent content system or support with a campaign launch."
                          />
                        </div>
                      </div>
                    )}

                    {/* Conditional: Unsure Questions */}
                    {formData.service === 'unsure' && (
                      <div className="conditional-group" id="unsure-questions">
                        <h4>Start with the challenge</h4>
                        <p>You do not need to diagnose the service before getting in touch.</p>
                        <div className="field">
                          <label htmlFor="unclear-needs">
                            What would help you move forward? <span className="optional">(optional)</span>
                          </label>
                          <textarea
                            id="unclear-needs"
                            name="unclearNeeds"
                            maxLength={800}
                            value={formData.unclearNeeds}
                            onChange={(e) => updateField('unclearNeeds', e.target.value)}
                            placeholder="Share any current challenges, questions or ideas you are weighing up."
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact choices */}
                    <fieldset className="contact-fieldset" id="contact-group">
                      <legend>
                        Preferred contact method <span className="required-mark" aria-hidden="true">*</span>
                      </legend>
                      <div className="choice-grid contact-choices">
                        <label className="choice">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="Email"
                            checked={formData.contactMethod === 'Email'}
                            onChange={() => updateField('contactMethod', 'Email')}
                          />
                          <span className="choice-card">
                            <strong>Email</strong>
                            <small>Use the address above</small>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="WhatsApp"
                            checked={formData.contactMethod === 'WhatsApp'}
                            onChange={() => updateField('contactMethod', 'WhatsApp')}
                          />
                          <span className="choice-card">
                            <strong>WhatsApp</strong>
                            <small>Number required</small>
                          </span>
                        </label>

                        <label className="choice">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="Phone"
                            checked={formData.contactMethod === 'Phone'}
                            onChange={() => updateField('contactMethod', 'Phone')}
                          />
                          <span className="choice-card">
                            <strong>Phone</strong>
                            <small>Number required</small>
                          </span>
                        </label>
                      </div>
                      {errors.contactMethod && (
                        <p className="field-error" id="contact-method-error">
                          {errors.contactMethod}
                        </p>
                      )}
                    </fieldset>

                    {(formData.contactMethod === 'WhatsApp' || formData.contactMethod === 'Phone') && (
                      <div className="field" id="phone-field">
                        <label htmlFor="phone" id="phone-label">
                          {formData.contactMethod === 'WhatsApp' ? 'WhatsApp number' : 'Phone number'}{' '}
                          <span className="required-mark" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          maxLength={30}
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="Include country code"
                          aria-invalid={!!errors.phone}
                          aria-describedby="phone-help phone-error"
                        />
                        <p className="field-help" id="phone-help">
                          Needed only for your selected contact method.
                        </p>
                        {errors.phone && (
                          <p className="field-error" id="phone-error">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="privacy-note">
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <rect x="4" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M7 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                      <span>
                        Nothing is transmitted until you submit. Do not include passwords, payment details or sensitive information. If direct delivery is not configured, you will receive a copyable inquiry draft instead.
                      </span>
                    </p>
                  </fieldset>
                )}

                {errorSummaryVisible && (
                  <div className="form-error-summary" id="form-error-summary" role="alert">
                    Please review the highlighted fields before continuing.
                  </div>
                )}

                <div className="form-actions">
                  {step > 1 && (
                    <button className="button button-back" id="back-button" type="button" onClick={handleBack}>
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M15 10H5M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Back
                    </button>
                  )}

                  {step < 3 ? (
                    <button className="button button-lime" id="next-button" type="button" onClick={handleNext}>
                      <span id="next-label">{step === 1 ? 'Next: Project' : 'Next: Details'}</span>
                      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className={`button button-lime ${isSubmitting ? 'is-loading' : ''}`}
                      id="submit-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <span className="button-spinner" aria-hidden="true" />
                      <span className="button-label">
                        {isSubmitting
                          ? siteConfig.formEndpoint
                            ? 'Sending…'
                            : 'Preparing…'
                          : siteConfig.formEndpoint
                          ? 'Send Inquiry'
                          : 'Prepare Inquiry'}
                      </span>
                      <svg className="button-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* Result Panel */
            <div className="form-result" id="form-result">
              <div className="result-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.2 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="eyebrow lime" id="result-eyebrow">
                {resultState.confirmed ? 'Delivery confirmed' : 'Ready for delivery'}
              </span>
              <h3 id="result-title" tabIndex={-1} ref={resultTitleRef}>
                {resultState.confirmed ? 'Your inquiry has been sent.' : 'Your inquiry is ready.'}
              </h3>
              <p className="result-message" id="result-message">
                {resultState.confirmed
                  ? 'The connected form service confirmed receipt. Keep a copy of your answers below for your records.'
                  : resultState.reason === 'error'
                  ? 'The delivery service could not confirm your submission. Your inquiry has not been marked as sent.'
                  : 'Direct form delivery is not connected yet, so nothing has been transmitted.'}
              </p>
              <div className="delivery-disclosure" id="delivery-disclosure">
                {resultState.confirmed
                  ? 'Delivery status: confirmed by an HTTP success response from the configured form service. This confirms service receipt, not a human reply.'
                  : resultState.reason === 'error'
                  ? 'Delivery status: not confirmed. Check the endpoint configuration or use the copy, download or email-draft option below. Avoid submitting repeatedly until the service status is clear.'
                  : 'Delivery status: draft only. Copy or download the summary, or open it in your email application. Real delivery requires the site owner to configure SITE_CONFIG.formEndpoint, or for you to send the draft yourself.'}
              </div>

              <label className="summary-label" htmlFor="result-summary">
                Formatted inquiry summary
              </label>
              <textarea
                id="result-summary"
                readOnly
                aria-label="Formatted inquiry summary"
                value={resultState.summaryText}
                rows={12}
              />

              <div className="result-actions">
                <button className="button button-lime" id="copy-inquiry" type="button" onClick={handleCopy}>
                  Copy Inquiry
                </button>
                <button className="button button-outline" id="email-draft" type="button" onClick={handleEmailDraft}>
                  Open Email Draft
                </button>
                <button className="button button-outline" id="download-inquiry" type="button" onClick={handleDownload}>
                  Download .txt
                </button>
              </div>

              <p className="draft-note" id="draft-note">
                {siteConfig.contactEmail
                  ? 'The draft will be addressed to the configured studio email. Review it and press Send in your email application.'
                  : 'No studio email is configured, so the draft opens without a recipient. Add the studio’s confirmed email address before sending.'}
              </p>

              <div className="result-secondary-actions">
                {!resultState.confirmed && (
                  <button id="edit-inquiry" type="button" onClick={handleEditAnswers}>
                    Edit answers
                  </button>
                )}
                <button id="new-inquiry" type="button" onClick={handleReset}>
                  Start a new inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
