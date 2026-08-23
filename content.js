// ============================================================
// CONTENT — edit this file to update the site. Add, remove, or
// reorder items in any array and the page (including nav links
// and section numbers like "01 / About") updates automatically.
// You should not need to touch index.html, style.css, or app.js
// for normal content edits — everything you'd want to change
// day-to-day lives right here.
// ============================================================
  const CONTENT = {
    // Order here controls both the nav bar and each section's
    // auto-numbered "01 / About" style label.
    nav: [
      { id: 'about',         label: 'About' },
      { id: 'experience',    label: 'Experience' },
      { id: 'projects',      label: 'Projects' },
      { id: 'publications',  label: 'Publications' },
      { id: 'skills',        label: 'Skills' },
      { id: 'contact',       label: 'Contact' }
    ],

    hero: {
      eyebrow: 'Data Scientist @ GreyB · Chandigarh, India',
      name: 'Disha Singh',
      tagline: `I build intelligent <strong>AI agents and LLM applications</strong>, mapping raw data into autonomous systems and predictive models that navigate complex domains. Move your cursor across the sky above.`,
    //   status:`currently orbiting`
    },

    about: {
      heading: 'Charting a course through data',
      paragraphs: [
        `I'm <strong>Disha Singh</strong>, a data scientist at <strong>GreyB</strong>, where I build AI agents and LLM-powered applications. My path here ran through research: equivariant neural networks for spatially-consistent image segmentation at <strong>Helmholtz-Zentrum Dresden-Rossendorf</strong> in Germany, and deep learning for radiology and healthcare imaging at Manentia AI.`,
        `Along the way I've published on lightweight transformer architectures for medical image classification and on ensemble methods for customer retention — both peer-reviewed with IEEE. I care about models that hold up outside the notebook: <strong>robust, efficient, and genuinely useful</strong> in the systems they end up in.`,
        `I'm a graduate of Aligarh Muslim University, and outside of work I spend a probably unreasonable amount of time reading about astronomy — which is where the theme of this site comes from.`
      ],
      stats: [
        { label: 'Current role',  value: 'Data Scientist, GreyB' },
        { label: 'Focus areas',   value: 'AI Agents · LLMs' },
        { label: 'Based in',      value: 'Chandigarh, IN' },
        { label: 'Publications',  value: '3, IEEE' }
      ]
    },

    experience: {
      heading: 'Orbital history',
      items: [
        {
          period: 'Oct 2024 — Present',
          title: 'Data Scientist, GreyB',
          description: 'Building AI agents and LLM-powered applications. Chandigarh, India — on-site.',
          tags: ['ai agents', 'llms', 'full-time']
        },
        {
          period: 'Apr 2024 — Oct 2024',
          title: 'Deep Learning Researcher, Manentia AI',
          description: 'Processed radiology scans across formats, improving data conversion speed by 25% while preserving metadata accuracy. Researched CNN-based segmentation models for healthcare, and used AutoML with PyTorch Lightning to lift model accuracy by 7% for clinical deployment. Bangalore — remote internship.',
          tags: ['cnn', 'pytorch lightning', 'automl']
        },
        {
          period: 'Jun 2023 — Aug 2023',
          title: 'Machine Learning Engineer, HZDR',
          description: 'Developed equivariant neural networks with a focus on spatial consistency for 2D segmentation tasks at Helmholtz-Zentrum Dresden-Rossendorf. Germany — on-site internship.',
          tags: ['equivariant nets', 'segmentation', 'research']
        }
      ]
    },

    projects: {
      heading: 'Mission log',
      codePrefix: 'M',
      items: [
        {
          title: 'Equivariant networks for 2D segmentation',
          description: 'Built equivariant neural networks with a focus on spatial consistency for 2D segmentation tasks, during a research internship at Helmholtz-Zentrum Dresden-Rossendorf (HZDR), Germany.',
          tags: ['equivariant nets', 'segmentation', 'hzdr'],
          linkText: 'View details →',
          linkUrl: '#'
        },
        {
          title: 'CNN segmentation for radiology scans',
          description: 'Processed radiology scans across formats, improving data conversion speed by 25% while preserving metadata accuracy. Used AutoML and PyTorch Lightning to lift model accuracy by 7% for clinical deployment, at Manentia AI.',
          tags: ['pytorch lightning', 'automl', 'radiology'],
          linkText: 'View details →',
          linkUrl: '#'
        }
      ]
    },

    publications: {
      heading: 'Research transmissions',
      codePrefix: 'P',
      items: [
        {
          title: 'Telecom churn prediction with ensemble methods',
          description: 'Compared Decision Tree, Random Forest, K-Neighbors, and XGBoost classifiers for predicting customer churn, with Random Forest reaching 98.25% accuracy. Published in <em>IEEE Access</em>, Aug 2024.',
          tags: ['random forest', 'xgboost', 'ieee access'],
          linkText: 'Read the paper →',
          linkUrl: '#'
        },
        {
          title: 'Lightweight transformers for OCT classification',
          description: 'Used MobileViT-XXS, a lightweight CNN-based transformer, to classify diabetic retinopathy and macular degeneration from Optical Coherence Tomography scans — 98.86% accuracy, 93.50% F1. Published with <em>IEEE</em>, May 2023.',
          tags: ['mobilevit', 'computer vision', 'healthcare'],
          linkText: 'Read the paper →',
          linkUrl: '#'
        }
      ]
    },

    skills: {
      heading: 'Instrument panel',
      items: [
        { title: 'AI Agents & LLMs',   description: 'Building agentic systems and LLM-powered applications — my current focus at GreyB.' },
        { title: 'Deep Learning',      description: 'CNNs, equivariant neural networks, and lightweight transformer architectures (MobileViT).' },
        { title: 'ML Frameworks',      description: 'PyTorch, PyTorch Lightning, AutoML — training and optimizing models for production reliability.' },
        { title: 'Applied Research',   description: 'Ensemble methods, exploratory data analysis, and rigorous model evaluation — published with IEEE.' },
        { title: 'Healthcare Imaging', description: 'Radiology scan processing and segmentation, OCT image classification for retinal disease.' },
        { title: 'Domains',            description: 'Healthcare, telecommunications, and physics-informed segmentation tasks.' }
      ]
    },

    contact: {
      heading: 'Send a transmission — I love reading every signal that comes through.',
      links: [
        { label: 'Email',    url: 'https://mail.google.com/mail/?view=cm&fs=1&to=dishasingh.space@gmail.com' },
        { label: 'GitHub',   url: 'https://github.com/Diishasing' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dishasingh1' }
      ]
    }
  };