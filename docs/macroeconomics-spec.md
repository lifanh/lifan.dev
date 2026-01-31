# Comprehensive Macroeconomics Instruction Platform Specification

## Overview

A full-featured macroeconomics instruction platform at `/tools/macroeconomics` that serves as a **complete educational resource** for understanding how entire economies function—from national output and employment to inflation, monetary policy, and international trade. This is not a simple demonstration tool—it is a comprehensive instructional document with embedded interactive tools, real-world scenarios, downloadable templates, and progressive mastery tracking.

The platform combines:
- **In-depth instructional content** covering foundational to intermediate macroeconomic concepts
- **Interactive simulators and data visualizers** embedded within each learning module
- **Real-life case studies** from economic history and current events
- **Downloadable reference materials** for continued learning
- **Self-assessment quizzes** to reinforce learning
- **Progressive curriculum** with clear learning outcomes

---

## Vision Statement

Macroeconomics shapes our daily lives in profound ways—from the job opportunities available to us, to the prices we pay, to the interest rates on our savings and loans. Yet most people feel powerless when news anchors discuss GDP growth, inflation reports, or Federal Reserve decisions.

This platform empowers users to:
- **Understand the economy they live in** with confidence
- **Interpret economic indicators** and news with sophistication
- **Recognize policy trade-offs** and their personal implications
- **Make informed decisions** about career, investment, and civic participation
- **Engage in economic debates** with factual grounding

---

## Goals

1. **Foundational Understanding**: Provide complete coverage of macroeconomic principles equivalent to an introductory university course
2. **Real-World Connection**: Connect every concept to observable economic events and data
3. **Data Literacy**: Enable users to read, interpret, and visualize economic data
4. **Policy Understanding**: Develop ability to evaluate fiscal and monetary policy proposals
5. **Interactive Learning**: Every concept reinforced with simulators, data exploration, and exercises
6. **Historical Context**: Use economic history to illuminate how concepts work in practice
7. **Resource Library**: Provide reference materials, data sources, and analytical frameworks

---

## MVP Scope

### MVP (Minimum Viable Product) - 12 Weeks

| Category | Included |
|----------|----------|
| **Modules** | Modules 1-6 (Parts I & II: Foundations + Economic Measurement & Growth) |
| **Core Simulators** | GDP Calculator, Business Cycle Visualizer, Aggregate Supply/Demand Simulator, Inflation Calculator |
| **Data Tools** | Economic Indicator Dashboard, Historical Data Explorer |
| **Assessments** | Knowledge Check quizzes for each module (10-15 questions each) |
| **Features** | Progress tracking, localStorage persistence, graph export, responsive design |

### Post-MVP (Phase 2)

| Category | Deferred |
|----------|----------|
| **Modules** | Modules 7-12 (Parts III & IV: Policy & International Economics) |
| **Advanced Tools** | Monetary Policy Simulator, Fiscal Policy Sandbox, Exchange Rate Modeler, Trade Balance Analyzer |
| **Enhancements** | Real-time data API integration, scenario builder, policy debate exercises |
| **Features** | User accounts, achievement system, certificates |

---

## Target Audience

### Primary Audiences

| Audience | Needs | Success Criteria |
|----------|-------|------------------|
| **Complete Beginners** | Zero economics background, want to understand economic news | Can interpret GDP, inflation, unemployment reports |
| **Investors** | Understand economic cycles and policy impacts | Can anticipate how Fed decisions affect markets |
| **Business Professionals** | Strategic planning, economic environment analysis | Can incorporate economic trends into business decisions |
| **Citizens** | Evaluate political/economic claims and policies | Can critically assess policy proposals |

### Secondary Audiences

- Journalists covering economic topics
- Students supplementing coursework
- Policymakers and their staff
- Anyone affected by the economy (everyone!)

---

## Curriculum Structure

The curriculum is organized into **4 Parts** containing **12 Modules**, progressing from foundational concepts to international economics.

**Estimated Total Learning Time**: 10-14 hours (self-paced)

---

# PART I: FOUNDATIONS OF MACROECONOMICS

## Module 1: Introduction to Macroeconomics

**Learning Objectives:**
- Distinguish macroeconomics from microeconomics
- Identify the major macroeconomic goals
- Understand the scope of macroeconomic study
- Recognize major economic systems
- Appreciate the role of models in economic analysis

### 1.1 What is Macroeconomics?

**Full Instructional Content:**

While microeconomics focuses on individual markets and decisions, macroeconomics studies the **economy as a whole**—examining aggregate phenomena that affect millions of people simultaneously.

**Macro vs. Micro:**

| Microeconomics | Macroeconomics |
|----------------|----------------|
| Price of gasoline | General price level (inflation) |
| Employment at one company | National unemployment rate |
| Individual consumer spending | Total consumer spending (GDP component) |
| One firm's production | National output (GDP) |

**The Big Questions of Macroeconomics:**

1. **Output**: Why are some countries rich and others poor? What causes economic growth?
2. **Employment**: Why can't everyone who wants a job find one? What causes recessions?
3. **Prices**: Why do prices rise over time? What causes inflation?
4. **Policy**: How can governments stabilize the economy? What are the trade-offs?
5. **Global**: How do economies interact? What causes currency crises?

### 1.2 The Three Macroeconomic Goals

**Every economy strives for:**

| Goal | Measure | Target |
|------|---------|--------|
| **Economic Growth** | Real GDP growth rate | 2-3% annually (developed countries) |
| **Full Employment** | Unemployment rate | 4-5% (natural rate, *current estimate*) |
| **Price Stability** | Inflation rate | 2% (most central banks) |

**Important Context:**
These targets aren't fixed. The "natural rate" of unemployment was estimated at 6-7% in the 1980s and is now thought to be 4-5%. The 2% inflation target became standard only after New Zealand adopted it in 1990. Economic understanding evolves.

**The Policy Trade-Offs:**
These goals sometimes conflict. For example, very low unemployment may push wages up, causing inflation. Understanding these trade-offs is central to macroeconomics.

### 1.3 Economic Systems

**How Societies Organize Economic Activity:**

| System | Key Features | Examples |
|--------|--------------|----------|
| **Market Economy** | Private ownership, price signals, decentralized decisions | United States, UK |
| **Command Economy** | State ownership, central planning | North Korea, former USSR |
| **Mixed Economy** | Blend of market and government involvement | Most real-world economies |
| **Traditional Economy** | Custom and tradition guide decisions | Some indigenous societies |

### 1.4 The Circular Flow Model

**The Economy's Basic Structure:**

```
         ┌─────────────────────────────┐
         │      Product Markets        │
         │   (Goods and Services)      │
         └────────┬──────────┬─────────┘
                  │          │
    Spending ($)  │          │  Revenue ($)
                  ▼          │
         ┌────────────┐      │
         │ Households │      │
         └────────┬───┘      │
                  │          │
    Income ($)    │          ▼
                  │    ┌────────────┐
                  │    │   Firms    │
                  │    └────────┬───┘
                  ▼             │
         ┌─────────────────────┴───────┐
         │      Factor Markets         │
         │  (Labor, Capital, Land)     │
         └─────────────────────────────┘
```

**Expanded Model Includes:**
- Government (taxes, spending)
- Financial sector (saving, investment)
- Foreign sector (imports, exports)

### Interactive Tool 1.1: Circular Flow Visualizer

**Purpose**: Interactive exploration of how money and goods flow through the economy.

**Features:**
- Animated flow of money and goods/services
- Toggle government sector on/off
- Toggle foreign sector on/off
- Toggle financial sector on/off
- Adjust flow values and see impacts
- Leakages and injections visualization
- Real GDP calculation from flows

### Interactive Tool 1.2: Economic Systems Comparison

**Purpose**: Compare how different economic systems answer fundamental questions.

**Features:**
- Three fundamental questions: What to produce? How? For whom?
- Side-by-side comparison across systems
- Historical examples with outcomes
- Interactive scenarios: "How would each system handle X?"

### Real-World Scenario 1.1: The Great Recession (2008)

**Introduction**: What happens when a macroeconomy fails?

**Overview:**
- Housing bubble and financial crisis
- GDP contraction of 4.3% (2008-2009)
- Unemployment peaked at 10%
- Policy responses: TARP, stimulus, Fed interventions

**Discussion:**
- How did individual microeconomic decisions (subprime mortgages) become a macroeconomic crisis?
- What were the trade-offs in policy responses?

### Knowledge Check 1

10 questions testing:
- Macro vs. micro distinctions
- Three macroeconomic goals
- Economic systems
- Circular flow concepts

### Downloadable Resources

- **Reference**: Macroeconomics Key Concepts Summary
- **Diagram**: Circular Flow Model (printable)
- **Glossary**: Module 1 Terms

---

## Module 2: Measuring the Economy: GDP

**Learning Objectives:**
- Define GDP and its components
- Calculate GDP using three approaches
- Distinguish between real and nominal GDP
- Understand GDP limitations
- Interpret GDP data and growth rates

### 2.1 What is GDP?

**Full Instructional Content:**

**Gross Domestic Product (GDP)** is the total market value of all final goods and services produced within a country's borders in a given time period.

**Key Terms in This Definition:**

| Term | Meaning | Why It Matters |
|------|---------|----------------|
| **Total market value** | Measured in dollars | Allows aggregation of diverse products |
| **Final goods** | Sold to end users | Avoids double-counting intermediate goods |
| **Produced** | Made during the period | Not counting resold items |
| **Within borders** | Domestic production | Includes foreign-owned factories here |
| **Time period** | Quarterly or annually | Allows comparison over time |

### 2.2 Three Approaches to Measuring GDP

**Expenditure Approach (Most Common):**
```
GDP = C + I + G + (X - M)
```

| Component | What It Measures | % of US GDP |
|-----------|------------------|-------------|
| **C** (Consumption) | Household spending | ~68% |
| **I** (Investment) | Business spending + residential | ~18% |
| **G** (Government) | Government purchases | ~17% |
| **(X-M)** (Net Exports) | Exports minus imports | ~-3% |

**Income Approach:**
GDP = Wages + Rent + Interest + Profits

**Output Approach:**
GDP = Sum of value added at each production stage

### 2.3 Real vs. Nominal GDP

**The Inflation Problem:**
If prices double, nominal GDP doubles—but actual production hasn't changed.

**Solution:**
- **Nominal GDP**: Measured in current-year prices
- **Real GDP**: Measured in constant base-year prices
- **GDP Deflator**: Price level = (Nominal GDP / Real GDP) × 100

**Example:**
| Year | Nominal GDP | Price Level | Real GDP (base year 0) |
|------|-------------|-------------|------------------------|
| 0 | $100 | 100 | $100 |
| 1 | $115 | 110 | $104.5 |
| 2 | $130 | 118 | $110.2 |

Real growth from Year 0 to 2: 10.2%, not 30%!

### 2.4 GDP Limitations

**What GDP Doesn't Capture:**

| Limitation | Example |
|------------|---------|
| **Non-market production** | Household work, volunteering |
| **Underground economy** | Cash transactions, illegal activities |
| **Quality improvements** | A $1000 computer today vs. 1990 |
| **Leisure time** | Working less may increase well-being |
| **Environmental degradation** | Pollution costs not subtracted |
| **Distribution** | GDP says nothing about inequality |

**Critical Thinking Moment:**
GDP is a measure of *economic activity*, not *welfare* or *progress*. A natural disaster can increase GDP (rebuilding spending) while clearly making people worse off. Always ask: "What is GDP actually measuring, and what does it miss?"

**Alternative Measures:**
- GNP (Gross National Product): By nationality, not location
- GDP per capita: Average per person
- HDI (Human Development Index): Includes education, life expectancy
- Genuine Progress Indicator: Adjusts for environmental and social factors
- Median income: Captures typical experience better than averages

### Interactive Tool 2.1: GDP Calculator

**Purpose**: Calculate GDP using different approaches and understand components.

**Features:**
- Expenditure approach calculator with all components
- Real vs. nominal conversion
- GDP per capita calculation
- Growth rate calculator
- Component breakdown pie chart
- Historical comparison mode

### Interactive Tool 2.2: Economic Data Explorer

**Purpose**: Explore real GDP data from FRED (Federal Reserve Economic Data).

**Features:**
- Interactive time series charts
- Compare countries
- Overlay recessions
- Growth rate calculations
- Component analysis over time
- Export data capability

### Real-World Scenario 2.1: China's Rise

**Case Study**: China's GDP growth from 1980 to present.

**Analysis:**
- Average 10% annual growth for decades
- From world's 10th to 2nd largest economy
- Nominal vs. PPP-adjusted comparisons
- Growth slowdown in recent years
- Current challenges: demographic decline, property sector stress, transition from investment-led to consumption-led growth

**Discussion Questions:**
- Is high GDP growth always desirable? What are the costs?
- How do we interpret GDP data from countries with different statistical practices?

### Knowledge Check 2

15 questions on:
- GDP definition and components
- Calculation methods
- Real vs. nominal distinction
- GDP limitations
- Data interpretation

### Downloadable Resources

- **Calculator**: GDP Growth Rate Calculator (Excel)
- **Reference**: GDP Components Quick Guide
- **Data**: Links to Official GDP Data Sources

---

## Module 3: Unemployment

**Learning Objectives:**
- Define and calculate the unemployment rate
- Distinguish between types of unemployment
- Understand the costs of unemployment
- Analyze labor force participation
- Interpret employment reports

### 3.1 Measuring Unemployment

**Full Instructional Content:**

**Labor Force Classifications:**

```
Population
    │
    ├── Under 16 / Institutionalized (Not counted)
    │
    └── Civilian Non-Institutional Population (16+)
            │
            ├── Not in Labor Force (Students, retirees, discouraged)
            │
            └── Labor Force
                    │
                    ├── Employed
                    │
                    └── Unemployed (seeking work)
```

**Key Formulas:**

| Measure | Formula |
|---------|---------|
| **Unemployment Rate** | (Unemployed / Labor Force) × 100 |
| **Labor Force Participation Rate** | (Labor Force / Civilian Pop) × 100 |
| **Employment-Population Ratio** | (Employed / Civilian Pop) × 100 |

### 3.2 Types of Unemployment

| Type | Cause | Duration | Policy Response |
|------|-------|----------|-----------------|
| **Frictional** | Job search, transitions | Short-term | Job matching services |
| **Structural** | Skill mismatches, technological change | Long-term | Training programs |
| **Cyclical** | Economic downturns | Variable | Stimulus policies |
| **Seasonal** | Regular seasonal patterns | Predictable | Seasonal adjustment |

### 3.3 The Natural Rate of Unemployment

**Full Employment ≠ Zero Unemployment**

The natural rate is the unemployment rate when the economy is at full potential, with no cyclical unemployment.

**Components:**
- Frictional unemployment (always some people between jobs)
- Structural unemployment (always some skill mismatches)

**US Natural Rate**: Approximately 4-5% (varies over time)

### 3.4 Costs of Unemployment

**Individual Costs:**
- Lost income and financial stress
- Skill depreciation ("scarring effects")
- Psychological effects (research shows unemployment impacts mental health as much as divorce)
- Reduced lifetime earnings (even after re-employment)

**Societal Costs:**
- Lost output (Okun's Law: 1% unemployment above natural rate ≈ 1.5-2% GDP loss)
- Increased government spending (unemployment benefits)
- Social problems (crime, health issues)
- Reduced tax revenue

**Okun's Law Note:**
The exact coefficient varies by country and time period. Originally estimated at 2% by Arthur Okun in 1962, modern estimates for the US range from 1.5-2.0. The relationship isn't fixed—it depends on labor market flexibility and economic structure.

### 3.5 Beyond the Headline Number

**Hidden Unemployment:**
- **Discouraged workers**: Want work but stopped looking
- **Underemployment**: Part-time wanting full-time
- **Marginally attached**: Want work but not recently looking

**U-3 vs. U-6:**
| Measure | Includes | Typical Rate |
|---------|----------|--------------|
| **U-3** (Official) | Unemployed seeking work | 4-5% |
| **U-6** (Broad) | U-3 + discouraged + underemployed | 8-10% |

### Interactive Tool 3.1: Unemployment Calculator

**Purpose**: Calculate various unemployment measures from raw data.

**Features:**
- Input labor force categories
- Calculate all standard measures
- See how reclassifications change rates
- Historical comparison charts
- State-by-state comparisons

### Interactive Tool 3.2: Jobs Report Analyzer

**Purpose**: Practice interpreting real employment reports.

**Features:**
- Simulated jobs reports with real formats
- Guided analysis questions
- Identify key takeaways
- Compare expectations vs. actual
- Market impact predictions

### Real-World Scenario 3.1: COVID-19 Unemployment Shock

**Case Study**: The unprecedented unemployment spike of April 2020.

**Analysis:**
- Unemployment jumped from 3.5% to 14.7% in two months
- Unique characteristics: temporary layoffs, PPP effects
- Recovery pattern analysis
- Comparison to Great Depression and Great Recession

### Knowledge Check 3

12 questions on:
- Calculating unemployment measures
- Classifying unemployment types
- Understanding natural rate
- Interpreting labor market data
- Costs of unemployment

### Downloadable Resources

- **Calculator**: Labor Market Calculator (Excel)
- **Reference**: Understanding the Jobs Report
- **Data**: Bureau of Labor Statistics Guide

---

# PART II: ECONOMIC FLUCTUATIONS AND GROWTH

## Module 4: Business Cycles

**Learning Objectives:**
- Identify phases of the business cycle
- Understand leading, lagging, and coincident indicators
- Explain causes of recessions
- Analyze business cycle history
- Interpret economic indicator dashboards

### 4.1 The Business Cycle

**Full Instructional Content:**

Economies don't grow in straight lines. They expand and contract in a recurring pattern called the **business cycle**.

**Phases of the Cycle:**

```
          Peak
           /\
          /  \
         /    \ Contraction
        /      \ (Recession)
       /        \
Expansion        \
                  \/
                Trough
```

| Phase | Description | Duration (avg) |
|-------|-------------|----------------|
| **Expansion** | Rising output, employment, incomes | 58 months (US avg) |
| **Peak** | Maximum economic activity | Point in time |
| **Contraction** | Falling output, rising unemployment | 11 months (US avg) |
| **Trough** | Minimum economic activity | Point in time |

### 4.2 Defining Recessions

**Technical Definition:**
Two consecutive quarters of declining real GDP (commonly cited but not official)

**NBER Definition:**
"A significant decline in economic activity spread across the economy, lasting more than a few months, normally visible in real GDP, real income, employment, industrial production, and wholesale-retail sales."

### 4.3 Economic Indicators

**Types of Indicators:**

| Type | Timing | Examples |
|------|--------|----------|
| **Leading** | Change before economy | Stock prices, building permits, yield curve, consumer confidence |
| **Coincident** | Change with economy | GDP, employment, industrial production, personal income |
| **Lagging** | Change after economy | Unemployment rate, CPI, business loans, labor costs |

**The Yield Curve as Predictor:**
An inverted yield curve (short-term rates > long-term rates) has preceded every US recession since 1970.

### 4.4 Causes of Business Cycles

**Major Theories:**

| Theory | Cause | Mechanism |
|--------|-------|-----------|
| **Demand shocks** | Changes in spending | Shift in aggregate demand |
| **Supply shocks** | Changes in production | Oil prices, natural disasters |
| **Financial crises** | Credit contractions | Bank failures, debt crises |
| **Policy errors** | Mistimed policy | Premature tightening/easing |
| **Real Business Cycle** | Technology shocks | Productivity changes |

### Interactive Tool 4.1: Business Cycle Visualizer

**Purpose**: Interactive exploration of historical business cycles.

**Features:**
- Timeline of US recessions and expansions
- Overlay economic indicators
- Zoom into specific periods
- Compare cycles across eras
- Identify turning points
- View multiple countries

### Interactive Tool 4.2: Leading Indicator Dashboard

**Purpose**: Track leading indicators and assess recession probability.

**Features:**
- Real-time indicator display (simulated)
- Color-coded warning system
- Historical accuracy of each indicator
- Composite index calculation
- Probability model output
- News event overlay

### Real-World Scenario 4.1: Anatomy of the 2008-2009 Recession

**Case Study**: The Great Recession in detail.

**Timeline:**
- Housing bubble peaks (2006)
- Bear Stearns collapse (March 2008)
- Lehman Brothers failure (September 2008)
- GDP contraction begins (Q4 2007)
- Trough reached (June 2009)
- Recovery begins

**Analysis Questions:**
- What indicators provided warning?
- Why was this recession deeper than average?
- What policy responses were implemented?

### Knowledge Check 4

12 questions on:
- Business cycle phases
- Indicator classification
- Recession definition
- Historical patterns
- Cause identification

### Downloadable Resources

- **Timeline**: US Business Cycle History (printable)
- **Reference**: Economic Indicators Quick Guide
- **Dashboard**: Leading Indicators Tracking Template

---

## Module 5: Aggregate Demand and Aggregate Supply

**Learning Objectives:**
- Construct and interpret aggregate demand curve
- Understand short-run and long-run aggregate supply
- Find macroeconomic equilibrium
- Analyze effects of demand and supply shocks
- Explain the self-correcting mechanism

### 5.1 Aggregate Demand

**Full Instructional Content:**

The **aggregate demand (AD)** curve shows the total quantity of goods and services demanded at each price level.

**Why AD Slopes Downward:**

| Effect | Mechanism |
|--------|-----------|
| **Wealth Effect** | Higher prices reduce purchasing power of savings |
| **Interest Rate Effect** | Higher prices increase money demand → higher rates → less investment |
| **Exchange Rate Effect** | Higher prices make exports expensive, imports cheap |

**AD Curve Shifters:**

| Factor | Shift Right (↑AD) | Shift Left (↓AD) |
|--------|-------------------|------------------|
| **Consumer spending** | ↑ Confidence, wealth | ↓ Confidence, wealth |
| **Investment** | ↑ Business optimism, ↓ interest rates | ↓ Business pessimism, ↑ interest rates |
| **Government spending** | ↑ Fiscal stimulus | ↓ Austerity |
| **Net exports** | ↑ Foreign demand, ↓ exchange rate | ↓ Foreign demand, ↑ exchange rate (currency appreciation) |

**Common Confusion:**
Remember that *lower* interest rates *increase* AD (by boosting investment), while *higher* interest rates *decrease* AD. This is counterintuitive because we often associate "higher" with "more."

### 5.2 Aggregate Supply

**Short-Run Aggregate Supply (SRAS):**
Upward sloping—higher prices encourage more production when input costs are sticky.

**Long-Run Aggregate Supply (LRAS):**
Vertical at potential GDP—output determined by resources and technology, not prices.

**Why SRAS Differs from LRAS:**
- Wage contracts are fixed short-term
- Menu costs make prices sticky
- Misperceptions about relative prices

**SRAS Shifters:**

| Factor | Shift Right | Shift Left |
|--------|-------------|------------|
| **Input prices** | ↓ Oil, wages | ↑ Oil, wages |
| **Productivity** | ↑ Technology | — |
| **Expectations** | ↓ Expected inflation | ↑ Expected inflation |
| **Regulations** | ↓ Burden | ↑ Burden |

### 5.3 Macroeconomic Equilibrium

**Short-Run Equilibrium:**
Where AD intersects SRAS

**Long-Run Equilibrium:**
Where AD, SRAS, and LRAS all intersect (at potential GDP)

**Gaps:**
| Gap Type | Actual GDP vs. Potential | Symptoms |
|----------|--------------------------|----------|
| **Recessionary Gap** | Below potential | High unemployment |
| **Inflationary Gap** | Above potential | Rising inflation |

### 5.4 The Self-Correcting Mechanism

**Without Policy Intervention:**

| Starting Point | Adjustment Process | End Point |
|----------------|-------------------|-----------|
| Recessionary gap | Wages fall → SRAS shifts right | Return to potential |
| Inflationary gap | Wages rise → SRAS shifts left | Return to potential |

**The Debate:**
- Classical view: Self-correction is quick, policy unnecessary
- Keynesian view: Self-correction is slow and painful, policy warranted

### Interactive Tool 5.1: AD-AS Simulator

**Purpose**: Interactive visualization of aggregate demand and supply.

**Features:**
- Draggable AD, SRAS, LRAS curves
- Real-time equilibrium calculation
- Shock buttons: "Oil price spike", "Consumer confidence surge"
- Short-run vs. long-run transition animation
- Gap calculation and display
- Policy intervention options

### Interactive Tool 5.2: Economic Shock Analyzer

**Purpose**: Practice predicting effects of economic events.

**Features:**
- Scenario descriptions (news events)
- Predict: Which curve shifts? Direction?
- Animated graph shows result
- Multiple simultaneous shocks
- Historical examples with analysis

### Real-World Scenario 5.1: The 1970s Stagflation

**Case Study**: When both inflation and unemployment rose.

**Analysis:**
- OPEC oil embargo (supply shock)
- Shift in SRAS
- Why traditional demand-side policies failed
- The painful solution (Volcker Fed)

### Knowledge Check 5

15 questions on:
- AD and AS curve construction
- Shifter identification
- Equilibrium analysis
- Gap identification
- Self-correction mechanism

### Downloadable Resources

- **Reference**: AD-AS Model Summary
- **Worksheet**: Economic Shock Analysis Practice
- **Diagram**: AD-AS Model Templates

---

## Module 6: Economic Growth

**Learning Objectives:**
- Calculate and interpret growth rates
- Understand determinants of long-run growth
- Apply the production function framework
- Analyze productivity and its drivers
- Compare growth across countries

### 6.1 The Importance of Growth

**Full Instructional Content:**

**The Power of Compounding:**

| Growth Rate | Years to Double | 50-Year Multiple |
|-------------|-----------------|------------------|
| 1% | 70 years | 1.6× |
| 2% | 35 years | 2.7× |
| 3% | 23 years | 4.4× |
| 5% | 14 years | 11.5× |

**Historical Growth:**
- Pre-1800: Essentially zero per capita growth for millennia
- 1800-1950: ~1.5% average in developed world
- 1950-2000: ~2.5% average in developed world

### 6.2 Measuring Growth

**Key Metrics:**

| Metric | Formula | Use |
|--------|---------|-----|
| **Growth rate** | (GDP₂ - GDP₁) / GDP₁ × 100 | Short-term comparison |
| **CAGR** | (End/Start)^(1/years) - 1 | Multi-year average |
| **Per capita growth** | GDP growth - Population growth | Living standard changes |
| **Rule of 70** | 70 / Growth rate = Doubling time | Quick estimation |

### 6.3 Determinants of Growth

**The Production Function:**
```
Y = A × f(K, L, H)
```
Where:
- Y = Output (GDP)
- A = Technology (Total Factor Productivity)
- K = Physical capital
- L = Labor quantity
- H = Human capital (skills)

**Growth Sources:**

| Factor | Contribution | How to Increase |
|--------|--------------|-----------------|
| **Physical Capital** | ~20-30% | Investment, savings |
| **Labor** | ~20-30% | Population, participation |
| **Human Capital** | ~20-30% | Education, training |
| **Technology** | ~30-40% | R&D, innovation |

### 6.4 Policies for Growth

| Policy Area | Mechanism | Examples |
|-------------|-----------|----------|
| **Saving/Investment** | Increase capital stock | Tax incentives, retirement programs |
| **Education** | Build human capital | Public education, student loans |
| **R&D** | Advance technology | Research grants, patent protection |
| **Institutions** | Enable efficient markets | Property rights, rule of law |
| **Trade** | Access to technology, specialization | Trade agreements, openness |

### 6.5 Convergence and Divergence

**The Convergence Hypothesis:**
Poorer countries should grow faster than rich ones (catching up is easier than innovating).

**Evidence:**
- Strong convergence among rich countries (OECD)
- Conditional convergence in developing world
- Some countries stuck in "poverty traps"

### Interactive Tool 6.1: Growth Calculator

**Purpose**: Model long-term growth scenarios.

**Features:**
- Input initial GDP and growth rate
- Project GDP over time
- Compare different growth scenarios
- Per capita adjustment
- Living standard comparisons
- Rule of 70 calculator

### Interactive Tool 6.2: Country Comparison Dashboard

**Purpose**: Compare growth across countries and time.

**Features:**
- Multi-country selection
- Time series visualization
- Per capita and total GDP
- Growth rate calculations
- Convergence visualization
- Factor decomposition (where available)

### Real-World Scenario 6.1: The Asian Tigers

**Case Study**: South Korea, Taiwan, Singapore, Hong Kong.

**Analysis:**
- Growth rates of 7-10% for decades
- From poor to rich in one generation
- Key factors: education, investment, exports, institutions
- Lessons for other developing countries

### Knowledge Check 6

12 questions on:
- Growth calculations
- Production function components
- Growth determinants
- Convergence concepts
- Policy implications

### Downloadable Resources

- **Calculator**: Economic Growth Projector (Excel)
- **Reference**: Growth Accounting Framework
- **Data**: Cross-Country Growth Data Sources

---

# PART III: MONETARY AND FISCAL POLICY (Post-MVP)

## Module 7: Money and the Banking System

**Learning Objectives:**
- Define money and its functions
- Understand how banks create money
- Analyze the money multiplier
- Explain central bank operations
- Interpret monetary aggregates

### Content Preview

- Functions of money: medium of exchange, store of value, unit of account
- Types of money: commodity, fiat, bank deposits
- Fractional reserve banking
- The money creation process
- Money supply measures (M1, M2)
- The Federal Reserve structure
- **The Equation of Exchange**: MV = PY (Money × Velocity = Price Level × Output)
  - This fundamental equation links monetary and real sides of the economy
  - Velocity measures how quickly money circulates

### Interactive Tools (Post-MVP)

- **Money Multiplier Calculator**: Trace money creation through banking system
- **Fed Balance Sheet Explorer**: Understand monetary operations

---

## Module 8: Monetary Policy

**Learning Objectives:**
- Explain central bank objectives
- Analyze monetary policy tools
- Trace the monetary transmission mechanism
- Evaluate policy effectiveness and limitations
- Interpret Fed communications

### Content Preview

- Federal Reserve mandate: price stability and maximum employment
- Policy tools: interest rates, reserve requirements, open market operations
- Quantitative easing and unconventional policy
- Transmission mechanism to real economy
- Policy lags and uncertainty
- Taylor Rule and policy rules

### Interactive Tools (Post-MVP)

- **Monetary Policy Simulator**: Set interest rates and see economic effects
- **Fed Watcher Game**: Predict and evaluate Fed decisions

---

## Module 9: Fiscal Policy

**Learning Objectives:**
- Explain fiscal policy tools and their effects
- Calculate fiscal multipliers
- Analyze automatic stabilizers
- Evaluate crowding out and Ricardian equivalence
- Assess budget deficits and debt sustainability

### Content Preview

- Government spending and taxation
- Discretionary vs. automatic stabilizers
- Multiplier effects
- Crowding out of private investment
- Budget deficits and national debt
- Debt sustainability analysis

### Interactive Tools (Post-MVP)

- **Fiscal Policy Sandbox**: Adjust taxes and spending, see effects
- **Debt Trajectory Calculator**: Project future debt levels

---

## Module 10: Inflation and Deflation

**Learning Objectives:**
- Define and measure inflation
- Distinguish demand-pull from cost-push inflation
- Analyze inflation costs and benefits
- Understand deflation risks
- Evaluate inflation-unemployment trade-offs

### Content Preview

- CPI, PCE, and other price measures
- Causes of inflation: demand-pull, cost-push, expectations
- Costs of inflation: shoe leather, menu, redistribution
- The Phillips Curve: short-run trade-off
- Hyperinflation case studies
- Deflation: Japan's lost decades

### Interactive Tools (Post-MVP)

- **Inflation Calculator**: Calculate real values across time
- **Phillips Curve Explorer**: Visualize inflation-unemployment relationship

---

# PART IV: INTERNATIONAL MACROECONOMICS (Post-MVP)

## Module 11: International Trade

**Learning Objectives:**
- Explain comparative advantage
- Analyze trade patterns and benefits
- Evaluate trade policy tools (tariffs, quotas)
- Assess trade's distributional effects
- Interpret balance of payments accounts

### Content Preview

- Absolute vs. comparative advantage
- Gains from trade
- Terms of trade
- Trade barriers and their effects
- Winners and losers from trade
- Balance of payments accounting

### Interactive Tools (Post-MVP)

- **Comparative Advantage Calculator**: Find optimal specialization
- **Tariff Impact Analyzer**: Model trade policy effects

---

## Module 12: Exchange Rates and International Finance

**Learning Objectives:**
- Explain exchange rate determination
- Distinguish fixed from floating exchange rate systems
- Analyze currency crises
- Understand open economy macroeconomics
- Evaluate international monetary system

### Content Preview

- Exchange rate basics and quotation
- Purchasing power parity
- Interest rate parity
- Fixed vs. floating regimes
- Currency crises: mechanisms and examples
- The impossible trinity

### Interactive Tools (Post-MVP)

- **Exchange Rate Modeler**: Predict currency movements
- **Currency Crisis Simulator**: Experience speculative attacks

---

## Appendices

### Glossary
Complete definitions of all macroeconomic terms introduced

### Formula Reference
All mathematical formulas used in the course

### Data Sources Guide
Links to official economic data from around the world

### Historical Timeline
Major macroeconomic events and policy milestones

### Recommended Reading
Books and resources for further study

---

## Technical Requirements

### Development Stack
- Astro + React (consistent with existing tools)
- Recharts for time series and economic charts
- Framer Motion for animations
- Zustand for state management
- localStorage for progress persistence

### Interactive Features
- Real-time data visualization
- Interactive graph manipulation
- Animated economic models
- Scenario comparison tools
- News event simulations

### Accessibility
- WCAG AA compliance
- Screen reader support for charts
- Keyboard navigation for all interactions
- High contrast mode

---

## Timeline Estimate

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | 3 weeks | Modules 1-3, GDP Calculator, Data Explorer |
| Phase 2 | 3 weeks | Modules 4-6, Business Cycle Tools, AD-AS Simulator |
| Phase 3 | 3 weeks | Testing, polish, responsive design |
| Phase 4 | 3 weeks | Modules 7-9 (post-MVP) |
| Phase 5 | 3 weeks | Modules 10-12, advanced tools (post-MVP) |

**MVP Completion**: 9 weeks
**Full Platform**: 15 weeks

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Module completion rate | >60% |
| Quiz average score | >75% |
| Tool usage per session | >3 interactions |
| Return visitor rate | >40% |
| Time on platform | >20 minutes average |

---

## Comparison with Microeconomics Platform

| Aspect | Microeconomics | Macroeconomics |
|--------|----------------|----------------|
| **Focus** | Individual decisions, markets | Economy-wide aggregates |
| **Key Tools** | Supply/Demand simulator | AD-AS simulator |
| **Data** | Market examples | National statistics |
| **Policy** | Market interventions | Fiscal/Monetary policy |
| **Visualization** | Market graphs | Time series, dashboards |
| **Interactivity** | Market games | Policy simulations |

Both platforms share:
- Same tech stack
- Similar pedagogical approach
- Progress tracking
- Quiz format
- Export capabilities
