<template>
  <div class="w-full">

    <!-- ================= HERO ================= -->
    <section class="relative overflow-hidden pt-14 sm:pt-20 pb-20 sm:pb-28">
      <!-- Ambient hero glows -->
      <div class="absolute top-[-20%] left-[-10%] h-[480px] w-[480px] rounded-full bg-white/[0.02] blur-[140px] pointer-events-none"></div>
      <div class="absolute top-[10%] right-[-15%] h-[520px] w-[520px] rounded-full bg-lumora-accent/[0.03] blur-[150px] pointer-events-none animate-pulse duration-[12000ms]"></div>
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <!-- Left: copy -->
        <div data-reveal>
          <div class="flex justify-center lg:justify-start mb-6">
            <Badge variant="accent" class="backdrop-blur-md bg-white/5 border-white/15 px-4 py-1.5 space-x-2">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Next-Generation Learning OS</span>
            </Badge>
          </div>

          <h1 class="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-lumora-primary text-center lg:text-left leading-[1.05]">
            Learn without limits.
            <span class="block bg-gradient-to-r from-white via-white to-lumora-secondary bg-clip-text text-transparent">
              Grow without ceilings.
            </span>
          </h1>

          <p class="mt-6 text-base sm:text-lg text-lumora-secondary leading-relaxed text-center lg:text-left max-w-xl mx-auto lg:mx-0 font-light">
            LUMORA is a modern, decoupled Learning Management System built for
            students, mentors and educators. Intuitive programs, real-time
            progress, and certifications — all in one elegant workspace.
          </p>

          <!-- CTAs -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <router-link to="/login" class="w-full sm:w-auto group">
              <Button variant="primary" class="w-full sm:w-auto !px-6 !py-3 !text-base shadow-lg shadow-white/5">
                Student Portal
                <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </router-link>
            <router-link to="/dashboard" class="w-full sm:w-auto">
              <Button variant="secondary" class="w-full sm:w-auto !px-6 !py-3 !text-base">
                <LayoutDashboard class="w-4 h-4" />
                Go to App
              </Button>
            </router-link>
          </div>

          <!-- Trust line -->
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div class="flex -space-x-2">
              <div v-for="(a, i) in avatars" :key="i" class="w-9 h-9 rounded-full ring-2 ring-lumora-bg flex items-center justify-center text-[10px] font-bold"
                :class="['bg-white/10', 'bg-white/15', 'bg-white/20', 'bg-white/25'][i % 4]">
                {{ a }}
              </div>
            </div>
            <p class="text-xs sm:text-sm text-lumora-secondary">
              Trusted by <span class="text-lumora-primary font-semibold">10,000+</span> learners across
              <span class="text-lumora-primary font-semibold">120+</span> institutions
            </p>
          </div>
        </div>

        <!-- Right: dashboard preview -->
        <div data-reveal class="relative mt-4 lg:mt-0">
          <!-- Floating accent badges -->
          <div class="hidden md:flex absolute -left-8 top-10 z-20 items-center gap-2 glass-card !rounded-2xl px-4 py-3 animate-float-slow">
            <div class="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <TrendingUp class="w-4.5 h-4.5" />
            </div>
            <div>
              <p class="text-[11px] text-lumora-secondary">Completion rate</p>
              <p class="text-sm font-semibold text-lumora-primary">+38% this term</p>
            </div>
          </div>
          <div class="hidden md:flex absolute -right-6 -bottom-6 z-20 items-center gap-2 glass-card !rounded-2xl px-4 py-3 animate-float-slower">
            <div class="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-400/20 flex items-center justify-center text-violet-300">
              <Award class="w-4.5 h-4.5" />
            </div>
            <div>
              <p class="text-[11px] text-lumora-secondary">Certificate earned</p>
              <p class="text-sm font-semibold text-lumora-primary">Full-Stack Web Dev</p>
            </div>
          </div>

          <!-- Main preview card -->
          <div class="glass-card rounded-3xl p-5 sm:p-6 shadow-2xl">
            <!-- Window header -->
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-white/20"></span>
                <span class="w-3 h-3 rounded-full bg-white/20"></span>
                <span class="w-3 h-3 rounded-full bg-white/20"></span>
              </div>
              <div class="flex items-center gap-2 text-[11px] text-lumora-secondary">
                <GraduationCap class="w-3.5 h-3.5" />
                lumora.io/dashboard
              </div>
            </div>

            <!-- Stat row -->
            <div class="grid grid-cols-3 gap-3 mb-5">
              <div v-for="stat in stats" :key="stat.label" class="rounded-2xl bg-white/[0.03] border border-white/10 p-3.5">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-lumora-secondary text-[11px]">{{ stat.label }}</span>
                  <component :is="stat.icon" class="w-3.5 h-3.5 text-lumora-accent/60" />
                </div>
                <p class="text-lg font-bold text-lumora-primary">{{ stat.value }}</p>
                <p class="text-[10px] text-emerald-400">{{ stat.delta }}</p>
              </div>
            </div>

            <!-- Mini bar chart -->
            <div class="rounded-2xl bg-white/[0.03] border border-white/10 p-4 mb-3">
              <div class="flex items-center justify-between mb-3">
                <p class="text-xs font-medium text-lumora-primary">Weekly Activity</p>
                <span class="text-[10px] text-lumora-secondary flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-lumora-accent"></span> Study hours
                </span>
              </div>
              <div class="flex items-end justify-between gap-2 h-24">
                <div v-for="(h, i) in barHeights" :key="i" class="flex-1 rounded-t-md bg-gradient-to-t from-white/5 to-white/40 origin-bottom hover:to-white/60 transition-all duration-200"
                  :style="{ height: h + '%', animation: `bar-grow .8s ease-out ${(i * 0.08).toFixed(2)}s both` }"></div>
              </div>
            </div>

            <!-- Course progress -->
            <div class="space-y-3">
              <div v-for="c in heroCourses" :key="c.title" class="flex items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/10 p-3">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="c.tile">
                  <component :is="c.icon" class="w-4.5 h-4.5" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-lumora-primary truncate">{{ c.title }}</p>
                  <div class="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r from-white/40 to-white" :style="{ width: c.progress + '%' }"></div>
                  </div>
                </div>
                <span class="text-[11px] text-lumora-secondary shrink-0">{{ c.progress }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= TRUSTED BY ================= -->
    <section data-reveal class="py-12 border-y border-white/5">
      <p class="text-center text-xs uppercase tracking-[0.25em] text-lumora-secondary/70 mb-8">
        Trusted by leading universities &amp; companies
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
        <div v-for="(logo, i) in trustedBy" :key="logo" class="flex items-center gap-2.5 text-lumora-secondary hover:text-lumora-primary transition-colors duration-300">
          <component :is="trustedIcons[i % trustedIcons.length]" class="w-5 h-5" />
          <span class="font-outfit font-bold text-base tracking-tight">{{ logo }}</span>
        </div>
      </div>
    </section>

    <!-- ================= FEATURES ================= -->
    <section class="py-20 sm:py-24">
      <div class="text-center max-w-2xl mx-auto mb-14" data-reveal>
        <Badge variant="default" class="bg-white/5 border border-white/10 px-4 py-1.5 mb-5">
          <Zap class="w-3.5 h-3.5" />
          <span>Why Lumora</span>
        </Badge>
        <h2 class="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-lumora-primary">
          Everything you need to master anything
        </h2>
        <p class="mt-4 text-lumora-secondary font-light leading-relaxed">
          Powerful, intuitive tools thoughtfully designed to make learning productive,
          measurable and rewarding — for students and institutions alike.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(feat, i) in features" :key="feat.title"
          data-reveal :style="{ transitionDelay: (i * 80) + 'ms' }"
          class="group relative glass-card rounded-3xl p-7 hover:-translate-y-1.5 transition-all duration-300">
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="mb-6 flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              :class="feat.tile">
              <component :is="feat.icon" class="w-6 h-6" />
            </div>
            <ArrowUpRight class="w-4 h-4 text-lumora-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
          <h3 class="text-lg font-bold text-lumora-primary mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-lumora-secondary leading-relaxed font-light">{{ feat.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ================= DASHBOARD PREVIEW ================= -->
    <section class="py-20 sm:py-24 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.015] blur-[160px] pointer-events-none"></div>

      <div class="relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <Badge tone="info" class="bg-white/5 border border-white/10 px-4 py-1.5 mb-5">
            <LayoutDashboard class="w-3.5 h-3.5" />
            <span>Your Command Center</span>
          </Badge>
          <h2 class="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-lumora-primary">
            Analytics that actually make sense
          </h2>
          <p class="mt-4 text-lumora-secondary font-light leading-relaxed">
            Track engagement, monitor progress and celebrate milestones with a
            dashboard designed around how you learn.
          </p>
        </div>

        <!-- Analytics stat cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5" data-reveal>
          <div v-for="(a, i) in analytics" :key="a.label" :style="{ transitionDelay: (i * 80) + 'ms' }"
            class="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :class="a.tile">
              <component :is="a.icon" class="w-5 h-5" />
            </div>
            <div>
              <p class="text-2xl font-bold text-lumora-primary leading-none">{{ a.value }}</p>
              <p class="text-[11px] text-lumora-secondary mt-1">{{ a.label }}</p>
            </div>
          </div>
        </div>

        <!-- Chart + courses -->
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-5" data-reveal>
          <!-- Progress chart -->
          <div class="lg:col-span-3 glass-card rounded-3xl p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <p class="text-sm font-medium text-lumora-primary">Learning Progress</p>
                <p class="text-xs text-lumora-secondary">Last 7 weeks</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button v-for="r in ['1W','1M','3M','All']" :key="r"
                  class="px-2.5 py-1 rounded-lg text-[11px] transition-colors"
                  :class="r === chartRange ? 'bg-white/15 text-lumora-primary' : 'text-lumora-secondary hover:text-lumora-primary'" @click="chartRange = r">
                  {{ r }}
                </button>
              </div>
            </div>

            <!-- SVG line chart -->
            <div class="relative h-48">
              <svg viewBox="0 0 400 160" class="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                  </linearGradient>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="rgba(217,217,217,0.4)" />
                    <stop offset="100%" stop-color="#FFFFFF" />
                  </linearGradient>
                </defs>
                <!-- gridlines -->
                <g class="stroke-white/5" stroke-width="1">
                  <line x1="0" y1="40" x2="400" y2="40" />
                  <line x1="0" y1="80" x2="400" y2="80" />
                  <line x1="0" y1="120" x2="400" y2="120" />
                </g>
                <path d="M0,130 L20,120 L40,124 L60,100 L80,108 L100,84 L120,92 L140,66 L160,74 L180,50 L200,58 L220,38 L240,46 L260,30 L280,40 L300,20 L320,28 L340,14 L360,20 L400,10 L400,160 L0,160 Z"
                  fill="url(#areaFill)" />
                <polyline points="0,130 20,120 40,124 60,100 80,108 100,84 120,92 140,66 160,74 180,50 200,58 220,38 240,46 260,30 280,40 300,20 320,28 340,14 360,20 400,10"
                  fill="none" stroke="url(#lineStroke)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="400" cy="10" r="4" fill="#FFFFFF" />
              </svg>
              <div class="absolute top-0 right-0 -translate-y-2 translate-x-2 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md px-2.5 py-1.5 text-[11px]">
                <span class="text-lumora-primary font-semibold">92%</span>
                <span class="text-lumora-secondary"> week avg</span>
              </div>
            </div>
          </div>

          <!-- Course cards -->
          <div class="lg:col-span-2 glass-card rounded-3xl p-6">
            <div class="flex items-center justify-between mb-6">
              <p class="text-sm font-medium text-lumora-primary">Active Courses</p>
              <router-link to="/programs" class="text-[11px] text-lumora-secondary hover:text-lumora-primary flex items-center gap-1 transition-colors">
                View all
                <ArrowRight class="w-3 h-3" />
              </router-link>
            </div>
            <div class="space-y-4">
              <div v-for="c in courseCards" :key="c.title" class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="c.tile">
                  <component :is="c.icon" class="w-5 h-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="text-xs font-medium text-lumora-primary truncate">{{ c.title }}</p>
                    <span class="text-[10px] text-lumora-secondary shrink-0 ml-2">{{ c.progress }}%</span>
                  </div>
                  <div class="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div class="h-full rounded-full" :class="c.bar" :style="{ width: c.progress + '%' }"></div>
                  </div>
                  <p class="mt-1 text-[10px] text-lumora-secondary">{{ c.modules }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= TESTIMONIALS ================= -->
    <section class="py-20 sm:py-24 border-t border-white/5">
      <div class="text-center max-w-2xl mx-auto mb-14" data-reveal>
        <Badge tone="success" class="bg-white/5 border border-white/10 px-4 py-1.5 mb-5">
          <MessagesSquare class="w-3.5 h-3.5" />
          <span>Loved by learners</span>
        </Badge>
        <h2 class="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-lumora-primary">
          What the community is saying
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div v-for="(t, i) in testimonials" :key="t.name" data-reveal :style="{ transitionDelay: (i * 100) + 'ms' }"
          class="glass-card rounded-3xl p-7 flex flex-col">
          <Quote class="w-6 h-6 text-white/20 mb-4" />
          <div class="flex gap-0.5 mb-4">
            <Star v-for="n in 5" :key="n" class="w-4 h-4 fill-lumora-accent text-lumora-accent" />
          </div>
          <p class="text-sm text-lumora-secondary leading-relaxed font-light flex-grow">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              :class="['bg-white/15','bg-white/20','bg-white/25'][i % 3]">
              {{ t.initials }}
            </div>
            <div>
              <p class="text-sm font-semibold text-lumora-primary">{{ t.name }}</p>
              <p class="text-[11px] text-lumora-secondary">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="py-20 sm:py-24 border-t border-white/5">
      <div class="max-w-3xl mx-auto" data-reveal>
        <div class="text-center mb-12">
          <Badge tone="info" class="bg-white/5 border border-white/10 px-4 py-1.5 mb-5">
            <LifeBuoy class="w-3.5 h-3.5" />
            <span>FAQ</span>
          </Badge>
          <h2 class="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-lumora-primary">
            Frequently asked questions
          </h2>
        </div>

        <div class="space-y-3">
          <div v-for="(item, i) in faqs" :key="i"
            class="glass-card rounded-2xl overflow-hidden">
            <button @click="toggleFaq(i)" class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
              :class="faqOpen === i ? '!bg-white/[0.04]' : 'hover:!bg-white/[0.02]'">
              <span class="text-sm sm:text-base font-medium text-lumora-primary">{{ item.q }}</span>
              <ChevronDown class="w-5 h-5 text-lumora-secondary shrink-0 transition-transform duration-300" :class="{ 'rotate-180': faqOpen === i }" />
            </button>
            <transition
              enter-active-class="transition-[max-height] duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-48 opacity-100"
              leave-active-class="transition-[max-height] duration-300 ease-in"
              leave-from-class="max-h-48 opacity-100"
              leave-to-class="max-h-0 opacity-0">
              <div v-show="faqOpen === i">
                <p class="px-6 pb-5 text-sm text-lumora-secondary leading-relaxed font-light">{{ item.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="py-20 sm:py-24" data-reveal>
      <div class="relative overflow-hidden glass-card rounded-[28px] p-10 sm:p-16 text-center">
        <div class="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-white/[0.05] blur-[100px] pointer-events-none"></div>
        <div class="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-lumora-accent/[0.05] blur-[100px] pointer-events-none"></div>
        <div class="relative">
          <h2 class="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-lumora-primary mx-auto max-w-xl leading-tight">
            Ready to master your next skill?
          </h2>
          <p class="mt-4 text-lumora-secondary font-light max-w-md mx-auto">
            Join Lumora today, take your first program and start building toward what matters to you.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link to="/signup"><Button variant="primary" class="!px-7 !py-3 !text-base">Start Learning Free <ArrowRight class="w-4 h-4" /></Button></router-link>
            <router-link to="/login"><Button variant="secondary" class="!px-7 !py-3 !text-base">Sign in</Button></router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FOOTER ================= -->
    <footer class="py-16 border-t border-white/5">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="md:col-span-1">
          <router-link to="/" class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 bg-lumora-accent text-lumora-bg rounded-xl flex items-center justify-center font-black text-xl select-none">
              L
            </div>
            <span class="font-outfit font-bold text-xl tracking-tight text-lumora-primary">LUMORA</span>
          </router-link>
          <p class="text-sm text-lumora-secondary leading-relaxed font-light max-w-xs">
            A next-generation decoupled Learning Management System built for modern learners and educators.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-lumora-primary mb-5">Product</h4>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link"><a href="#" class="text-sm text-lumora-secondary hover:text-lumora-primary transition-colors">{{ link }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-lumora-primary mb-5">Company</h4>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link"><a href="#" class="text-sm text-lumora-secondary hover:text-lumora-primary transition-colors">{{ link }}</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-lumora-primary mb-5">Contact</h4>
          <ul class="space-y-3 text-sm text-lumora-secondary">
            <li class="flex items-center gap-2.5"><Mail class="w-4 h-4 text-lumora-accent/60 shrink-0" /> hello@lumora.io</li>
            <li class="flex items-center gap-2.5"><Phone class="w-4 h-4 text-lumora-accent/60 shrink-0" /> +1 (555) 010-2030</li>
            <li class="flex items-center gap-2.5"><MapPin class="w-4 h-4 text-lumora-accent/60 shrink-0" /> San Francisco, CA</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-lumora-secondary/70">&copy; 2026 Lumora LMS. All rights reserved.</p>
        <div class="flex items-center gap-6 text-xs text-lumora-secondary/70">
          <a href="#" class="hover:text-lumora-primary transition-colors">Privacy</a>
          <a href="#" class="hover:text-lumora-primary transition-colors">Terms</a>
          <a href="#" class="hover:text-lumora-primary transition-colors">Security</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';
import Badge from '@/components/Badge.vue';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Brain,
  CalendarCheck,
  ChevronDown,
  CircleCheck,
  Clock,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  NotebookText,
  Phone,
  Quote,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Video,
  Zap,
} from '@lucide/vue';

/* ---- Data ---- */

const appName = 'LUMORA LMS';

const avatars = ['AJ', 'MK', 'DR', 'SL'];

const stats: { label: string; value: string; delta: string; icon: Component }[] = [
  { label: 'Programs', value: '12', delta: '+2 this month', icon: GraduationCap },
  { label: 'Hours', value: '68', delta: '+14%', icon: Clock },
  { label: 'GPA', value: '3.9', delta: '+0.3', icon: TrendingUp },
];

const barHeights = [42, 60, 48, 72, 64, 82, 92];

const heroCourses = [
  { title: 'Data Structures & Algorithms', progress: 78, icon: Brain, tile: 'bg-violet-500/15 text-violet-300 border border-violet-400/20' },
  { title: 'Full-Stack Web Development', progress: 64, icon: NotebookText, tile: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/20' },
  { title: 'UI / UX Fundamentals', progress: 42, icon: MonitorSmartphone, tile: 'bg-amber-500/15 text-amber-300 border border-amber-400/20' },
];

const trustedBy = ['Standford', 'Mechanical', 'ComputeX', 'Vantage', 'Ashford', 'Skylark', 'Northwind'];

const trustedIcons: Component[] = [GraduationCap, Network, ShieldCheck, MonitorSmartphone, Users, Rocket, BookOpen];

const features: { icon: Component; title: string; desc: string; tile: string }[] = [
  { icon: BookOpen, title: 'Interactive Courses', desc: 'Structured, self-paced modules with rich media and hands-on exercises built to keep you engaged.', tile: 'bg-white/10 text-white border border-white/15' },
  { icon: Video, title: 'Live & Recorded Sessions', desc: 'Join instructor-led classes live or catch up with high-quality recorded content any time.', tile: 'bg-white/10 text-white border border-white/15' },
  { icon: TrendingUp, title: 'Adaptive Progress Tracking', desc: 'Real-time analytics show exactly where you are and nudge you toward your next milestone.', tile: 'bg-white/10 text-white border border-white/15' },
  { icon: Award, title: 'Certificates & Badges', desc: 'Earn recognized certificates and share verified credentials across the web.', tile: 'bg-white/10 text-white border border-white/15' },
  { icon: MessagesSquare, title: 'Mentor Support', desc: 'Reach instructors and mentors through built-in messaging and collaborative feedback loops.', tile: 'bg-white/10 text-white border border-white/15' },
  { icon: MonitorSmartphone, title: 'Learn Anywhere', desc: 'A seamless experience across desktop and mobile — your progress stays perfectly in sync.', tile: 'bg-white/10 text-white border border-white/15' },
];

const analytics = [
  { icon: Users, label: 'Active Learners', value: '12.4k', tile: 'bg-white/10 text-white border border-white/10' },
  { icon: Clock, label: 'Hours on Platform', value: '186k', tile: 'bg-white/10 text-white border border-white/10' },
  { icon: Award, label: 'Certificates Issued', value: '9.2k', tile: 'bg-white/10 text-white border border-white/10' },
  { icon: TrendingUp, label: 'Avg. Completion', value: '87%', tile: 'bg-white/10 text-white border border-white/10' },
];

const courseCards = [
  { title: 'Data Structures & Algorithms', progress: 78, modules: '32 / 41 modules', icon: Brain, tile: 'bg-white/10 text-white border border-white/10', bar: 'bg-gradient-to-r from-white/50 to-white' },
  { title: 'Full-Stack Web Development', progress: 64, modules: '18 / 28 modules', icon: NotebookText, tile: 'bg-white/10 text-white border border-white/10', bar: 'bg-gradient-to-r from-white/50 to-white' },
  { title: 'Machine Learning Basics', progress: 51, modules: '9 / 18 modules', icon: Zap, tile: 'bg-white/10 text-white border border-white/10', bar: 'bg-gradient-to-r from-white/50 to-white' },
];

const testimonials = [
  { quote: 'LUMORA completely changed how I study. Tracking my progress and earning certifications keeps me consistent and motivated every single week.', name: 'Ava Thompson', role: 'CS Student', initials: 'AT' },
  { quote: 'As an instructor, the analytics and course tools are phenomenal. I can finally see exactly where my learners need help.', name: 'Dr. Marcus Reed', role: 'Course Mentor', initials: 'MR' },
  { quote: 'The mobile experience is flawless. I study on my commute and everything stays in sync. Genuinely the best LMS I have used.', name: 'Lena Fischer', role: 'Graphic Designer', initials: 'LF' },
];

const faqs = [
  { q: 'Is Lumora free to get started?', a: 'Yes. You can sign up and start learning with free programs immediately. Paid certifications and advanced tracks are optional add-ons.' },
  { q: 'How is my learning progress tracked?', a: 'Lumora records completion, time spent, quiz scores, and milestones in real time, and visualizes them on an intuitive analytics dashboard.' },
  { q: 'Can institutions deploy Lumora themselves?', a: 'Absolutely. Lumora is decoupled and self-hostable, deployable via Docker with full control over your data and infrastructure.' },
  { q: 'Are the certificates recognized?', a: 'Certificates are digitally verified and shareable, giving you a credible, verifiable record of every skill you complete.' },
];

const productLinks = ['Features', 'Pricing', 'Documentation', 'Changelog'];
const companyLinks = ['About Us', 'Careers', 'Blog', 'Support'];

const faqOpen = ref<number | null>(0);
const chartRange = ref('1M');

/* ---- Reveal-on-scroll ---- */

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer?.observe(el));
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
/* === Reusable glass surfaces === */
.glass-card {
  background: rgba(20, 20, 20, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6);
}

/* Reveal-on-scroll */
[data-reveal] {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Floating animations */
@keyframes bar-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(12px); }
}
.animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
.animate-float-slower { animation: float-slower 9s ease-in-out infinite; }

/* Display font helper */
.font-display {
  font-family: 'Outfit', sans-serif;
}
</style>