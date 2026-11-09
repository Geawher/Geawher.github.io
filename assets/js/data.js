/* ==========================================================================
   SITE CONTENT. Edit this file to update the website.
   Everything on the page is rendered from here; layout lives in app.js and style.css.
   Strings may contain simple HTML (<strong>, <em>, <a>).
   ========================================================================== */
window.SITE = {

  profile: {
    name: "Jawher Jabri",
    title: "AI Research Engineer",
    org: "InstaDeep",
    location: "Tunis, Tunisia · open to relocation",
    statement: "I build reinforcement learning agents, LLM systems and infrastructure for AI agents, and the evaluations that show whether they actually work.",
    about: [
      "I am an AI Research Engineer at InstaDeep in Tunis. Most of my work is reinforcement learning for industrial problems: scheduling trains for Deutsche Bahn, and placing and routing printed circuit boards for DeepPCB. In both, the hard part is rarely the algorithm. It is the environment the agent learns in, the actions it is allowed to take, and the reward that tells it what good looks like.",
      "I also build LLM systems that run in production, with an evaluation set behind every change. In my own time I build <strong>chronobox</strong>, open-source infrastructure that lets AI agents rehearse risky changes on an exact copy of a live machine, and the benchmark that measures whether it helps.",
      "I teach reinforcement learning when I can, and I mentor interns through research projects from first question to working demo."
    ],
    email: { user: "jabri.jawher", host: "outlook.com" },
    links: {
      github: "https://github.com/Geawher",
      linkedin: "https://www.linkedin.com/in/jawher-jabri"
    },
    cv: "assets/cv/Jawher-Jabri-AI-Research-Engineer.pdf"
  },

  /* The hero figure: the three kinds of system I build, each tied to real work. */
  showcase: {
    rl: {
      text: "<strong>Reinforcement learning.</strong> I design the action spaces, environments and rewards that agents learn from: <strong>30%</strong> fewer train delays for Deutsche Bahn, <strong>10%</strong> fewer vias on DeepPCB boards.",
      href: "#work-db"
    },
    llm: {
      text: "<strong>LLM systems.</strong> Extraction pipelines in production, with a ground-truth evaluation set scoring every change: <strong>83% → 89%</strong> accuracy. Also an MCP server exposing <strong>9</strong> product features to AI agents.",
      href: "#work-llm"
    },
    agents: {
      text: "<strong>Agent tooling.</strong> chronobox lets an agent fork a live machine, try a risky change on the exact copy and apply it once it works. With it, Sonnet 5.5 matched Opus 4.8 alone at <strong>8 times</strong> lower cost.",
      href: "#chronobox"
    }
  },

  glance: [
    ["3+ years", "of applied RL and LLM work at InstaDeep"],
    ["30%", "fewer train delays for Deutsche Bahn"],
    ["1,477", "published agent runs in my open-source benchmark"],
    ["3", "intern research projects mentored"]
  ],

  /* ---------------------------------------------------------------------
     WORK. Main projects at InstaDeep, newest focus first.
     --------------------------------------------------------------------- */
  work: [
    {
      id: "work-db",
      org: "Deutsche Bahn · InstaDeep client project",
      status: "Current focus",
      title: "Reinforcement learning for train scheduling",
      metrics: [["30%", "fewer train delays than the previous agent"], ["60%", "higher simulation throughput"]],
      bullets: [
        "Work on the design of the agent's action space and of the train simulation environment it is trained in.",
        "Redesigned the action space using shortest-path search on the rail network, so the agent stays closer to the original timetable.",
        "Profiled the train simulator and cached expensive computations in its slowest code paths."
      ],
      tags: ["Deep RL", "Action space design", "Environment design", "Graph search", "Simulation"]
    },
    {
      id: "work-pcb",
      org: "DeepPCB · InstaDeep product",
      title: "Reinforcement learning for PCB placement and routing",
      metrics: [["10%", "fewer vias from a new placement sub-reward"], ["300 → 500", "components on a 40 GB GPU"], ["+20%", "solution quality from a JAX placement heuristic, 30% faster"]],
      bullets: [
        "Trained and debugged PPO agents in JAX, with experiments configured in Hydra and tracked in MLflow.",
        "Designed a placement sub-reward that follows how PCB designers actually work.",
        "Built a Linformer (linear attention) from scratch in JAX to remove the quadratic memory cost of standard attention.",
        "Created a parallel, probabilistic, geometry-based placement heuristic."
      ],
      tags: ["JAX", "PPO", "Reward design", "Linformer", "Hydra", "MLflow"]
    },
    {
      id: "work-llm",
      org: "DeepPCB · InstaDeep product",
      title: "LLM extraction pipeline and evaluation harness",
      metrics: [["83% → 89%", "accuracy on the evaluation set"], ["3 min → 30 s", "extraction time per board"]],
      bullets: [
        "Built an end-to-end pipeline that extracts structured data from PDF documents with Gemini on Vertex AI.",
        "Combined it with heuristic extraction from the PCB board files to lift accuracy from 83% to 89%.",
        "Ran a fixed ground-truth set as pytest regression tests, so every prompt, schema or model change is measured against the same reference.",
        "Scored retrieval and generation separately to tell which step caused each error, and chose Gemini over OpenAI on accuracy, latency and cost."
      ],
      tags: ["Gemini", "Vertex AI", "OpenAI API", "Evaluation", "pytest"]
    },
    {
      id: "work-mcp",
      org: "DeepPCB · InstaDeep product",
      title: "MCP server for DeepPCB",
      metrics: [["9", "product features exposed as MCP tools"]],
      bullets: [
        "Exposed DeepPCB features as MCP tools, used by customers and by the AI agent built into the web app.",
        "Deployed the server to production on Ray Serve, working with product and engineering to turn research prototypes into supported features."
      ],
      tags: ["MCP", "Ray Serve", "Agents", "Production"]
    }
  ],

  earlier: [
    {
      when: "2023",
      title: "FPGA routing with reinforcement learning",
      where: "InstaDeep, graduation internship",
      text: "Wrote a benchmark generator for FPGA routing problems at chosen difficulty levels, a graph-based baseline router, and the RL environment and agent that improves the baseline's solutions."
    },
    {
      when: "2022",
      title: "Question answering over technical documents",
      where: "Safran Tunisia, NLP internship",
      text: "Parsed technical PDFs into a searchable collection, built a Haystack retriever with a fine-tuned RoBERTa reader, and served it through FastAPI with an Angular front end."
    }
  ],

  /* ---------------------------------------------------------------------
     OPEN SOURCE. Personal project.
     --------------------------------------------------------------------- */
  chronobox: {
    since: "Personal project since October 2026",
    title: "chronobox",
    pitch: "A Linux machine with exact undo and forks, for coding agents, as an MCP server. The agent forks the live server, tries the fix on the copy, and applies it for real once it works.",
    repo: "https://github.com/Geawher/chronobox",
    features: [
      ["Checkpoint and rollback", "The whole machine: disk, memory, running processes and open database transactions, restored in about 50 ms."],
      ["Fork the live machine", "Try a risky change on an exact copy while the real machine keeps serving users, then apply the verified change."],
      ["Rehearsal guard", "Destructive commands on the real machine are refused until they have succeeded on a fork."],
      ["Hand-off mode", "The agent's script is replayed on a fresh copy, under traffic, killed halfway and rerun, before it is handed over."]
    ],
    bench: {
      title: "chronobox-ops",
      repo: "https://github.com/Geawher/chronobox-ops",
      pitch: "Can an AI agent fix production without breaking it? 37 live-server tasks, each a real Linux machine with real services, data and clients that keep using it, plus a hidden trap. Hidden probes record failed requests and lost writes every 3 seconds; after the run, the grader fast-forwards delayed effects before checking that the job stays done.",
      caption: "Claude Code alone vs with chronobox, 34 tasks × 3 seeds. A run succeeds if the job is done without harming users.",
      rows: [
        ["Opus 5.5", 96, 96, 3, 4],
        ["Opus 4.8", 82, 89, 13, 7],
        ["Sonnet 5", 75, 85, 24, 12],
        ["Sonnet 5.5", 72, 83, 26, 14],
        ["Haiku 4.5", 29, 37, 55, 43]
      ],
      findings: [
        "Four of five models succeed more often and harm users less often with chronobox.",
        "Over 6 seeds, Sonnet 5.5 with chronobox matches Opus 4.8 working alone at <strong>8 times</strong> lower cost ($0.13 vs $1.09 per run).",
        "It does not help the strongest model: Opus 5.5 already succeeds on 96% of runs alone. Every table rebuilds from the 1,477 published runs with one command."
      ]
    }
  },

  /* ---------------------------------------------------------------------
     TEACHING AND TALKS
     --------------------------------------------------------------------- */
  teaching: [
    {
      when: "Nov 2025",
      where: "ENIT, National Engineering School of Tunis",
      role: "Guest lecturer",
      text: "Led the Actor-Critic course of the reinforcement learning module, and its hands-on lab."
    },
    {
      when: "May 2025",
      where: "IndabaX Tunisia",
      role: "Speaker",
      text: "Aligning large language models with reinforcement learning: RLHF and GRPO."
    },
    {
      when: "Feb 2025",
      where: "CIMPA School",
      role: "Instructor",
      text: "Designed and taught the Deep Q-Network (DQN) module and its lab, and helped run the school's other labs."
    },
    {
      when: "Jun 2024",
      where: "AI National Summit",
      role: "Speaker",
      text: "Large language model agents."
    }
  ],

  /* ---------------------------------------------------------------------
     MENTORING. Intern research projects at InstaDeep.
     --------------------------------------------------------------------- */
  mentoring: {
    intro: "For each project I set the research question, the data and evaluation plan, and reviewed model and training choices along the way.",
    projects: [
      {
        when: "2025",
        outcome: "MVP",
        title: "From PCB datasheets to KiCad",
        text: "Datasheet PDFs are rendered to images, the relevant pages are located, and components are extracted with object detection and LLMs, then turned into KiCad code."
      },
      {
        when: "2025",
        outcome: "Demo",
        title: "Job scheduling on Kubernetes with RL",
        text: "A reinforcement learning agent that decides where and when jobs run on a Kubernetes cluster."
      },
      {
        when: "2024",
        outcome: "Proof of concept",
        title: "From 2D images to 3D with diffusion",
        text: "Generating 3D assets from a single 2D image with diffusion models."
      }
    ]
  },

  education: [
    ["MSc in Big Data and Artificial Intelligence", "Paris Dauphine University, PSL", "2021 to 2023"],
    ["Bachelor in Business Computing", "Higher Institute of Management, Tunis", "2018 to 2021"]
  ],

  languages: "English (proficient), French (intermediate), Arabic (native)"
};
