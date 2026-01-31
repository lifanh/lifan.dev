# Comprehensive Microeconomics Instruction Platform Specification

## Overview

A full-featured microeconomics instruction platform at `/tools/microeconomics` that serves as a **complete educational resource** for understanding how individuals, households, and firms make decisions about resource allocation. This is not a simple demonstration tool—it is a comprehensive instructional document with embedded interactive tools, real-world scenarios, downloadable templates, and progressive mastery tracking.

The platform combines:
- **In-depth instructional content** covering foundational to intermediate microeconomic concepts
- **Interactive simulators and calculators** embedded within each learning module
- **Real-life case studies** that demonstrate practical application
- **Downloadable reference materials** for continued learning
- **Self-assessment quizzes** to reinforce learning
- **Progressive curriculum** with clear learning outcomes

---

## Vision Statement

Microeconomics surrounds us in every decision we make—from choosing what to buy for breakfast to negotiating a salary, from starting a business to understanding why prices change. Yet most people navigate these decisions without understanding the powerful frameworks that economists have developed over centuries.

This platform empowers users to:
- **Think like an economist** about everyday decisions
- **Understand market dynamics** that affect their lives
- **Make better choices** about consumption, career, and investment
- **Recognize market failures** and their policy implications
- **Apply economic reasoning** to personal and business contexts

---

## Goals

1. **Foundational Understanding**: Provide complete coverage of microeconomic principles equivalent to an introductory university course
2. **Practical Application**: Enable users to apply economic thinking to personal decisions and understand business strategy
3. **Interactive Learning**: Every concept reinforced with simulators, games, and exercises
4. **Real-World Connection**: Connect every principle to observable market behavior
5. **Critical Thinking**: Develop ability to analyze policy proposals and business decisions
6. **Visual Learning**: Use graphs, charts, and animations to make abstract concepts concrete
7. **Resource Library**: Provide reference materials, decision frameworks, and analytical tools

---

## MVP Scope

### MVP (Minimum Viable Product) - 12 Weeks

| Category | Included |
|----------|----------|
| **Modules** | Modules 1-6 (Parts I & II: Foundations + Consumer & Producer Theory) |
| **Core Simulators** | Supply & Demand Simulator, Utility Maximizer, Production Cost Calculator, Market Equilibrium Finder |
| **Visualizers** | Interactive demand/supply curves, indifference curves, production functions |
| **Assessments** | Knowledge Check quizzes for each module (10-15 questions each) |
| **Features** | Progress tracking, localStorage persistence, graph export, responsive design |

### Post-MVP (Phase 2)

| Category | Deferred |
|----------|----------|
| **Modules** | Modules 7-12 (Parts III & IV: Market Structures + Market Failures & Policy) |
| **Advanced Tools** | Game Theory Simulator, Oligopoly Strategy Game, Externality Calculator, Public Goods Analyzer |
| **Enhancements** | Multi-player market simulations, API for real price data, scenario builder |
| **Features** | User accounts, achievement system, certificates |

---

## Target Audience

### Primary Audiences

| Audience | Needs | Success Criteria |
|----------|-------|------------------|
| **Complete Beginners** | Zero economics background, curious about how markets work | Can explain supply/demand, understand price changes |
| **Business Professionals** | Pricing decisions, market analysis, competitive strategy | Can apply economic frameworks to business decisions |
| **Students** | Supplement coursework, prepare for exams | Mastery of core concepts, problem-solving ability |
| **Policy Enthusiasts** | Understand economic arguments in public debate | Can analyze policy proposals using economic reasoning |

### Secondary Audiences

- Entrepreneurs evaluating market opportunities
- Investors understanding company competitive positions
- Journalists covering economic topics
- Anyone curious about "why things cost what they cost"

---

## Curriculum Structure

The curriculum is organized into **4 Parts** containing **12 Modules**, progressing from foundational concepts to advanced applications.

**Estimated Total Learning Time**: 10-14 hours (self-paced)

---

# PART I: FOUNDATIONS OF ECONOMIC THINKING

## Module 1: The Economic Way of Thinking

**Learning Objectives:**
- Define economics and explain scarcity as the fundamental problem
- Apply the concept of opportunity cost to personal decisions
- Use marginal analysis for decision-making
- Understand the difference between positive and normative economics
- Recognize trade-offs in everyday choices

### 1.1 What is Economics?

**Full Instructional Content:**

Economics is the study of how individuals, businesses, and societies allocate scarce resources among unlimited wants. Every economic question ultimately comes down to one fundamental reality: **scarcity**.

**The Core Insight:**
We have unlimited wants but limited resources. This forces us to make choices—and every choice has a cost.

**Economics in Your Daily Life:**
- Should I hit snooze or get up early to exercise? (Time allocation)
- Should I buy coffee or save that $5? (Consumption choice)
- Should I take this job or negotiate for more? (Labor market decision)
- Should I rent or buy a home? (Investment decision)

All of these are economic decisions, whether we realize it or not.

**Two Branches of Economics:**

| Branch | Focus | Questions It Answers |
|--------|-------|---------------------|
| **Microeconomics** | Individual decisions, markets | Why do gas prices change? How should a company price its product? |
| **Macroeconomics** | Economy-wide phenomena | Why do recessions happen? What causes inflation? |

**Positive vs. Normative Economics:**

| Type | Description | Example |
|------|-------------|---------|
| **Positive** | Describes what *is*; can be tested | "Raising the minimum wage to $15 will reduce employment by 2%" |
| **Normative** | States what *should be*; involves values | "The minimum wage should be $15 because workers deserve a living wage" |

Economic analysis can inform normative debates but cannot resolve them—values are beyond the scope of economics.

**Thinking Like an Economist: Key Principles**

1. **Assumptions simplify**: Models use "ceteris paribus" (all else equal) to isolate effects
2. **Correlation ≠ Causation**: Ice cream sales and drowning deaths are correlated (both rise in summer), but ice cream doesn't cause drowning
3. **Incentives matter**: People respond to costs and benefits
4. **Trade-offs exist**: Every choice has an opportunity cost
5. **Think at the margin**: Decisions are about "one more" not "all or nothing"

### 1.2 Scarcity and Choice

**The Scarcity Principle:**
We cannot have everything we want. Resources—time, money, natural resources, labor—are limited.

**Types of Resources (Factors of Production):**

| Resource | Definition | Examples |
|----------|------------|----------|
| **Land** | Natural resources | Oil, minerals, water, farmland |
| **Labor** | Human effort | Physical work, mental effort, skills |
| **Capital** | Produced tools for production | Machinery, buildings, computers |
| **Entrepreneurship** | Organization and risk-taking | Business founders, innovators |

### 1.3 Opportunity Cost

**The Key Concept:**
The opportunity cost of any choice is the value of the next best alternative you give up.

**Examples:**

| Choice | Obvious Cost | Opportunity Cost |
|--------|--------------|------------------|
| Going to college | Tuition ($40,000/year) | 4 years of potential salary ($50,000/year = $200,000) |
| Watching Netflix for 3 hours | $0 | 3 hours of studying, exercise, or side project |
| Buying a new car | $30,000 | Investment returns if that money was invested (could grow to $60,000+ in 20 years) |

**The Production Possibilities Frontier (PPF):**
A model showing the trade-offs an economy faces between producing different goods.

### 1.4 Marginal Analysis

**Thinking at the Margin:**
Economists don't ask "Should I study?" but rather "Should I study one more hour?"

**The Marginal Principle:**
Make a choice if the marginal benefit exceeds the marginal cost.

**Example**: Should you eat another slice of pizza?
- First slice: Marginal benefit = Very high (you're hungry!)
- Fourth slice: Marginal benefit = Moderate (still tasty)
- Seventh slice: Marginal benefit = Low (feeling full)
- Marginal cost: Price + feeling sick

At some point, the marginal cost exceeds the marginal benefit. That's when you stop.

### 1.5 Sunk Costs: The Trap to Avoid

**Sunk Cost:**
A cost that has already been incurred and cannot be recovered.

**The Sunk Cost Fallacy:**
Continuing an activity because of past investment, even when the marginal cost exceeds marginal benefit.

| Situation | Sunk Cost Fallacy | Rational Thinking |
|-----------|-------------------|-------------------|
| Paid $100 for concert ticket, but feeling sick | "I paid $100, I have to go!" | "Will going make me feel better or worse? The $100 is gone either way." |
| Invested $50K in failing business | "I can't quit now, I've invested so much!" | "Should I invest more based on *future* prospects, not past spending?" |
| Watched 2 hours of bad movie | "Might as well finish it" | "Is the next hour worth my time?" |

**Key Principle:** When making decisions, only consider costs and benefits *from this point forward*. What you've already spent is irrelevant.

### Interactive Tool 1.1: Opportunity Cost Calculator

**Purpose**: Quantify the true cost of decisions including opportunity costs.

**Features:**
- Input decision scenarios (purchase, time allocation, career choice)
- Calculate explicit costs (money spent)
- Identify and value opportunity costs (alternatives foregone)
- Visualize total cost vs. just monetary cost
- "What could this money become?" investment growth projection
- Time value calculator (what's your hour worth?)

### Interactive Tool 1.2: Production Possibilities Frontier Simulator

**Purpose**: Visualize trade-offs and efficiency using the PPF model.

**Features:**
- Interactive PPF curve with draggable production point
- Real-time opportunity cost calculation as you move along curve
- Demonstrate concepts: efficiency, inefficiency, unattainable points
- Show how economic growth shifts the PPF outward
- Multiple scenarios: personal time allocation, business resource allocation, national economy

### Real-World Scenario 1.1: The College Decision

**Scenario**: Maya is deciding between attending a 4-year university or starting work immediately.

**Analysis Framework:**
1. Calculate explicit costs of college
2. Calculate opportunity cost (foregone wages)
3. Estimate lifetime earnings differential
4. Consider non-monetary benefits
5. Apply present value concepts

**Interactive Element**: Decision calculator showing break-even point and lifetime earnings comparison.

### Knowledge Check 1

10 questions testing:
- Definition of economics and scarcity
- Opportunity cost calculations
- Marginal analysis application
- PPF interpretation
- Positive vs. normative statements

### Downloadable Resources

- **Worksheet**: Personal Opportunity Cost Audit
- **Template**: Decision Matrix with Opportunity Costs
- **Reference**: Economic Thinking Checklist

---

## Module 2: Supply and Demand Fundamentals

**Learning Objectives:**
- Construct demand curves from individual behavior
- Construct supply curves from producer behavior
- Explain what shifts demand and supply curves
- Find market equilibrium price and quantity
- Predict how markets respond to changes
- Apply supply and demand to real-world markets

### 2.1 The Demand Side

**Full Instructional Content:**

Demand represents the relationship between price and quantity that consumers are willing and able to purchase.

**The Law of Demand:**
As price increases, quantity demanded decreases (ceteris paribus—all else equal).

**Why the Law of Demand Works:**

| Effect | Explanation |
|--------|-------------|
| **Substitution Effect** | Higher prices make alternatives more attractive |
| **Income Effect** | Higher prices reduce purchasing power |
| **Diminishing Marginal Utility** | Each additional unit provides less satisfaction |

**Individual vs. Market Demand:**
Market demand is the horizontal sum of all individual demand curves.

**Demand Curve Shifters (Changes in Demand):**

| Factor | Increase in Demand | Decrease in Demand |
|--------|-------------------|-------------------|
| **Income (normal goods)** | Income rises | Income falls |
| **Income (inferior goods)** | Income falls | Income rises |
| **Price of substitutes** | Substitute price rises | Substitute price falls |
| **Price of complements** | Complement price falls | Complement price rises |
| **Tastes/preferences** | Good becomes more popular | Good becomes less popular |
| **Expectations** | Expect higher future prices | Expect lower future prices |
| **Number of buyers** | Population increases | Population decreases |

**⚠️ Critical Distinction:**

| Term | Meaning | What Causes It | On the Graph |
|------|---------|----------------|--------------|
| **Change in Quantity Demanded** | Movement along the curve | Price change of the good itself | Point A → Point B on same curve |
| **Change in Demand** | Shift of the entire curve | Any factor OTHER than price | Curve D₁ → Curve D₂ |

This is the #1 source of confusion in supply and demand analysis!

### 2.2 The Supply Side

**The Law of Supply:**
As price increases, quantity supplied increases (ceteris paribus).

**Why Producers Supply More at Higher Prices:**
- Higher prices make production more profitable
- Can cover costs of less efficient production methods
- Attracts new producers to the market

**Supply Curve Shifters:**

| Factor | Increase in Supply | Decrease in Supply |
|--------|-------------------|-------------------|
| **Input prices** | Inputs become cheaper | Inputs become more expensive |
| **Technology** | Better technology | Technology restricted |
| **Expectations** | Expect lower future prices | Expect higher future prices |
| **Number of sellers** | More producers enter | Producers exit |
| **Government** | Subsidies | Taxes, regulations |

### 2.3 Market Equilibrium

**Where Supply Meets Demand:**
Equilibrium occurs where quantity demanded equals quantity supplied. At this point:
- No shortage (excess demand)
- No surplus (excess supply)
- Price is stable

**Disequilibrium:**

| Situation | What Happens | Market Response |
|-----------|--------------|-----------------|
| **Price above equilibrium** | Surplus (unsold goods) | Price falls |
| **Price below equilibrium** | Shortage (unmet demand) | Price rises |

### 2.4 Market Changes

**Four-Step Analysis:**
1. Is it demand or supply that changes?
2. Does the curve shift right (increase) or left (decrease)?
3. Find the new equilibrium
4. Compare new price and quantity to original

### 2.5 Consumer and Producer Surplus

**Measuring Market Benefits:**

| Concept | Definition | Graphically |
|---------|------------|-------------|
| **Consumer Surplus** | Benefit buyers receive beyond what they pay | Area below demand curve, above price |
| **Producer Surplus** | Benefit sellers receive beyond their costs | Area above supply curve, below price |
| **Total Surplus** | CS + PS = Total market welfare | Combined area between curves |

**Why This Matters:**
Surplus measures show whether markets are creating value efficiently. When markets are in equilibrium, total surplus is maximized—no reallocation could make anyone better off without making someone else worse off.

**Example**: If you'd pay $50 for a coffee but the price is $5, your consumer surplus is $45. If the coffee shop's cost is $2 and they sell for $5, their producer surplus is $3.

### Interactive Tool 2.1: Supply and Demand Simulator

**Purpose**: Interactive visualization of market dynamics.

**Features:**
- Adjustable demand and supply curves (drag to shift)
- Real-time equilibrium calculation
- Price and quantity sliders to see shortages/surpluses
- Event buttons: "Increase in consumer income", "New technology", "Substitute price rises"
- Animated market adjustment to new equilibrium
- Multiple market scenarios (housing, gasoline, coffee, labor)
- Step-by-step analysis mode with explanations

### Interactive Tool 2.2: Market Event Analyzer

**Purpose**: Practice predicting market responses to real-world events.

**Features:**
- News headline scenarios (e.g., "Drought hits coffee-growing regions")
- Multi-step guided analysis
- Predict: Which curve shifts? Which direction? What happens to P and Q?
- Visual feedback showing correct analysis
- 50+ real-world scenarios across different markets
- Difficulty levels: Basic → Intermediate → Complex (multiple simultaneous shifts)

### Real-World Scenario 2.1: The Avocado Toast Effect

**Case Study**: Why did avocado prices triple between 2010 and 2017?

**Analysis:**
- Demand factors: Health trends, millennial preferences, social media
- Supply factors: Growing conditions, transportation costs
- Equilibrium shifts over time
- Price response and new equilibrium

### Real-World Scenario 2.2: Uber Surge Pricing

**Case Study**: How does Uber's dynamic pricing work economically?

**Analysis:**
- Demand spikes during events, weather, holidays
- Supply of drivers is relatively fixed short-term
- Surge pricing as market-clearing mechanism
- Incentive effects on driver supply

### Knowledge Check 2

15 questions on:
- Reading demand and supply curves
- Identifying curve shifters
- Finding equilibrium
- Predicting market changes
- Distinguishing movement along vs. shift of curves

### Downloadable Resources

- **Reference**: Supply and Demand Cheat Sheet
- **Worksheet**: Market Analysis Practice Problems
- **Template**: Four-Step Market Analysis Framework

---

## Module 3: Elasticity and Its Applications

**Learning Objectives:**
- Calculate price elasticity of demand and supply
- Interpret elasticity values and their implications
- Explain determinants of elasticity
- Apply elasticity to pricing decisions and tax policy
- Calculate income and cross-price elasticity

### 3.1 Price Elasticity of Demand

**Full Instructional Content:**

Elasticity measures responsiveness—how much quantity demanded changes when price changes.

**The Formula:**
```
Price Elasticity of Demand (PED) = % Change in Quantity Demanded / % Change in Price
```

**Interpreting Elasticity:**

| Elasticity Value | Description | Consumer Response |
|------------------|-------------|-------------------|
| |PED| > 1 | Elastic | Very responsive to price changes |
| |PED| = 1 | Unit elastic | Proportional response |
| |PED| < 1 | Inelastic | Less responsive to price changes |
| |PED| = 0 | Perfectly inelastic | No response (vertical curve) |
| |PED| = ∞ | Perfectly elastic | Infinite response (horizontal curve) |

**Why Elasticity Matters:**

For businesses: Determines pricing strategy
- Elastic demand: Lower prices increase revenue
- Inelastic demand: Higher prices increase revenue

For governments: Determines tax burden and effectiveness
- Taxing inelastic goods (cigarettes) raises revenue
- Taxing elastic goods changes behavior

### 3.2 Determinants of Elasticity

**What Makes Demand Elastic?**

| Factor | More Elastic When... | Example |
|--------|---------------------|---------|
| **Availability of substitutes** | Many substitutes exist | Coke vs. Pepsi |
| **Necessity vs. luxury** | Good is a luxury | Vacations vs. medicine |
| **Time horizon** | More time to adjust | Gasoline (long run) |
| **Budget share** | Large share of budget | Housing vs. salt |
| **Definition of market** | Narrowly defined | "Nike shoes" vs. "footwear" |

**Important Nuance:**
Necessity alone doesn't determine elasticity. Insulin is extremely inelastic because it's a necessity *with no substitutes* for diabetics. Coffee is a "necessity" for many people, but has many substitutes (tea, energy drinks), making it more elastic.

### 3.3 Elasticity and Revenue

**The Total Revenue Test:**
- If demand is elastic: Price ↑ → Revenue ↓
- If demand is inelastic: Price ↑ → Revenue ↑
- If demand is unit elastic: Price ↑ → Revenue unchanged

### 3.4 Other Elasticities

**Income Elasticity of Demand:**
```
YED = % Change in Quantity Demanded / % Change in Income
```

| YED Value | Good Type | Example |
|-----------|-----------|---------|
| YED > 1 | Luxury/Superior | Fine dining, vacations |
| 0 < YED < 1 | Normal necessity | Groceries, utilities |
| YED < 0 | Inferior | Ramen noodles, bus rides |

**Cross-Price Elasticity:**
```
XED = % Change in Quantity Demanded of A / % Change in Price of B
```

| XED Value | Relationship | Example |
|-----------|--------------|---------|
| XED > 0 | Substitutes | Coke and Pepsi |
| XED < 0 | Complements | Cars and gasoline |
| XED = 0 | Unrelated | Apples and smartphones |

### 3.5 Price Elasticity of Supply

**The Formula:**
```
Price Elasticity of Supply (PES) = % Change in Quantity Supplied / % Change in Price
```

**What Determines Supply Elasticity:**

| Factor | More Elastic Supply When... | Example |
|--------|----------------------------|---------|
| **Time to adjust** | Longer time horizon | Manufacturing (long run) vs. fresh fish (short run) |
| **Spare capacity** | Unused productive capacity exists | Factories running at 70% vs. 100% capacity |
| **Factor mobility** | Inputs can be easily reallocated | General-purpose equipment vs. specialized machinery |
| **Inventory** | Goods can be stored | Canned goods vs. fresh produce |
| **Production period** | Quick production cycles | Digital products vs. wine aging |

**Why Supply Elasticity Matters for Tax Incidence:**
When a tax is imposed, the burden falls more heavily on the side of the market that is *more inelastic*. If supply is inelastic, producers bear more of the tax.

### Interactive Tool 3.1: Elasticity Calculator

**Purpose**: Calculate and interpret various elasticity measures.

**Features:**
- Input price and quantity changes
- Midpoint method calculation (avoids direction bias)
- Automatic classification (elastic/inelastic)
- Revenue impact prediction
- Visual demand curve with elasticity zones marked
- Real-world examples database for comparison

### Interactive Tool 3.2: Pricing Strategy Simulator

**Purpose**: Explore how elasticity affects optimal pricing.

**Features:**
- Set demand elasticity for a product
- Adjust prices and see revenue impact
- Find revenue-maximizing price
- Compare different market segments with different elasticities
- Price discrimination scenarios
- Break-even analysis with elasticity

### Real-World Scenario 3.1: Why Are Prescription Drugs So Expensive?

**Case Study**: Pharmaceutical pricing and demand elasticity.

**Analysis:**
- Inelastic demand for life-saving medications
- Lack of substitutes
- Third-party payment effects
- Policy implications

### Knowledge Check 3

12 questions on:
- Elasticity calculations
- Interpreting elasticity values
- Revenue predictions
- Determinants of elasticity
- Cross-price and income elasticity

### Downloadable Resources

- **Calculator**: Elasticity Calculator (Excel)
- **Reference**: Elasticity Formulas Quick Guide
- **Case Studies**: Elasticity in Different Industries

---

# PART II: CONSUMER AND PRODUCER THEORY

## Module 4: Consumer Choice Theory

**Learning Objectives:**
- Explain utility and marginal utility
- Construct and interpret indifference curves
- Understand budget constraints
- Find optimal consumer choices
- Analyze how price and income changes affect choices
- Apply consumer theory to real decisions

### 4.1 Utility and Satisfaction

**Full Instructional Content:**

Utility is the economist's term for satisfaction or happiness derived from consumption.

**Key Concepts:**

| Term | Definition |
|------|------------|
| **Total Utility** | Overall satisfaction from consuming a quantity |
| **Marginal Utility** | Additional satisfaction from one more unit |
| **Diminishing Marginal Utility** | Each additional unit provides less satisfaction |

**Example**: Eating pizza slices
| Slices | Total Utility | Marginal Utility |
|--------|---------------|------------------|
| 0 | 0 | — |
| 1 | 20 | 20 |
| 2 | 35 | 15 |
| 3 | 45 | 10 |
| 4 | 50 | 5 |
| 5 | 50 | 0 |
| 6 | 45 | -5 |

### 4.2 Indifference Curves

**Mapping Preferences:**
An indifference curve shows all combinations of two goods that give the same utility.

**Properties:**
1. Higher curves = higher utility
2. Curves slope downward
3. Curves don't intersect
4. Curves are convex to origin (diminishing MRS)

**Marginal Rate of Substitution (MRS):**
How much of one good you'd give up for one more unit of another while maintaining same utility.

### 4.3 Budget Constraints

**What You Can Afford:**
```
Budget Line: Px × X + Py × Y = Income
```

The budget line shows all affordable combinations of two goods.

**Shifts in Budget Line:**
- Income increase → Parallel outward shift
- Price of X increases → Pivot inward on X-axis

### 4.4 Optimal Choice

**The Utility-Maximizing Rule:**
Consume where: MUx/Px = MUy/Py

Or graphically: Where the budget line is tangent to the highest reachable indifference curve.

### Interactive Tool 4.1: Utility Maximization Visualizer

**Purpose**: Interactive exploration of consumer choice theory.

**Features:**
- Draggable indifference curves and budget lines
- Real-time display of MRS and price ratio
- Find optimal consumption bundle
- See how choices change with price changes
- Income and substitution effect decomposition
- Multiple consumer preference types (Cobb-Douglas, perfect substitutes, perfect complements)

### Interactive Tool 4.2: Personal Budget Optimizer

**Purpose**: Apply consumer theory to real spending decisions.

**Features:**
- Input monthly income
- List spending categories with estimated "satisfaction"
- Suggest reallocation to maximize utility
- Track satisfaction ratings over time
- Goal-based optimization (maximize savings while maintaining minimum satisfaction)

### Real-World Scenario 4.1: The Streaming Service Dilemma

**Scenario**: You have a $50/month entertainment budget. Netflix, Spotify, gaming subscription, and movie theaters all compete for your dollars.

**Analysis:**
- Marginal utility of each service
- Optimal allocation
- How price changes affect choices

### Knowledge Check 4

12 questions on:
- Utility concepts
- Indifference curve properties
- Budget constraint calculations
- Optimal choice identification
- Price and income effects

### Downloadable Resources

- **Worksheet**: Personal Utility Analysis
- **Reference**: Consumer Choice Theory Summary
- **Template**: Budget Optimization Worksheet

---

## Module 5: Production and Costs

**Learning Objectives:**
- Distinguish between short-run and long-run production
- Explain the law of diminishing marginal returns
- Calculate and graph various cost measures
- Understand economies and diseconomies of scale
- Apply cost analysis to business decisions

### 5.1 The Production Function

**Full Instructional Content:**

Production transforms inputs (factors of production) into outputs (goods and services).

**Short Run vs. Long Run:**
| Time Frame | Definition | Example |
|------------|------------|---------|
| **Short Run** | At least one input is fixed | Factory size is fixed, can add workers |
| **Long Run** | All inputs are variable | Can build new factories, fully adjust |

**Key Production Concepts:**

| Term | Formula | Meaning |
|------|---------|---------|
| **Total Product (TP)** | Total output | Total units produced |
| **Marginal Product (MP)** | ΔTP / ΔL | Additional output from one more worker |
| **Average Product (AP)** | TP / L | Output per worker |

### 5.2 Law of Diminishing Marginal Returns

**The Key Insight:**
As you add more of a variable input (keeping others fixed), eventually the additional output from each unit decreases.

**Example**: A restaurant kitchen
- 1 cook: Can handle basic orders (MP = 20 meals/hour)
- 2 cooks: Specialization helps (MP = 25 meals/hour) ← *Increasing returns phase*
- 3 cooks: Starting to crowd (MP = 18 meals/hour) ← *Diminishing returns begins*
- 4 cooks: Getting in each other's way (MP = 10 meals/hour)
- 5 cooks: Chaos in the kitchen (MP = 2 meals/hour)

**Three Phases of Returns:**
| Phase | What Happens | Why |
|-------|--------------|-----|
| **Increasing Returns** | MP rises | Specialization, teamwork benefits |
| **Diminishing Returns** | MP positive but falling | Fixed input becomes constraining |
| **Negative Returns** | MP negative | Overcrowding, counterproductive |

### 5.3 Short-Run Costs

**Cost Definitions:**

| Cost | Formula | Description |
|------|---------|-------------|
| **Total Fixed Cost (TFC)** | — | Costs that don't change with output |
| **Total Variable Cost (TVC)** | — | Costs that change with output |
| **Total Cost (TC)** | TFC + TVC | All costs |
| **Average Fixed Cost (AFC)** | TFC / Q | Fixed cost per unit |
| **Average Variable Cost (AVC)** | TVC / Q | Variable cost per unit |
| **Average Total Cost (ATC)** | TC / Q | Total cost per unit |
| **Marginal Cost (MC)** | ΔTC / ΔQ | Cost of one more unit |

**Key Relationships:**
- MC intersects ATC and AVC at their minimum points
- As AFC spreads over more units, ATC approaches AVC
- U-shaped cost curves reflect diminishing returns

### 5.4 Long-Run Costs and Economies of Scale

**Economies of Scale:**
| Type | Description | Example |
|------|-------------|---------|
| **Economies of Scale** | Costs decrease as output increases | Bulk purchasing, specialization |
| **Constant Returns** | Costs stay proportional | — |
| **Diseconomies of Scale** | Costs increase as output increases | Coordination problems, bureaucracy |

### Interactive Tool 5.1: Production Function Simulator

**Purpose**: Visualize production and diminishing returns.

**Features:**
- Adjustable input levels
- Real-time output calculation
- Graphs of TP, MP, and AP
- Identify diminishing returns point
- Multiple production function types
- Isoquant display for two inputs

### Interactive Tool 5.2: Cost Curve Calculator

**Purpose**: Calculate and visualize all cost measures.

**Features:**
- Input fixed costs and variable cost per unit
- Auto-calculate all cost measures
- Generate complete cost curve graphs
- Find minimum ATC and AVC
- Profit calculation at different prices
- Break-even analysis

### Real-World Scenario 5.1: The Food Truck Decision

**Case Study**: Fixed vs. variable costs in a food truck business.

**Analysis:**
- Identify fixed costs (truck, permits, insurance)
- Identify variable costs (ingredients, packaging, fuel)
- Calculate break-even point
- Decide optimal operating hours

### Knowledge Check 5

15 questions on:
- Production function concepts
- Diminishing returns
- Cost calculations
- Cost curve relationships
- Economies of scale

### Downloadable Resources

- **Calculator**: Complete Cost Calculator (Excel)
- **Reference**: Cost Curve Relationships Cheat Sheet
- **Template**: Business Cost Analysis Worksheet

---

## Module 6: Perfect Competition

**Learning Objectives:**
- Identify characteristics of perfectly competitive markets
- Determine short-run profit-maximizing output
- Calculate profit, loss, and break-even points
- Explain the shut-down decision
- Derive the firm's supply curve
- Analyze long-run equilibrium and entry/exit

### 6.1 Characteristics of Perfect Competition

**Full Instructional Content:**

Perfect competition is a market structure with many buyers and sellers, homogeneous products, and free entry/exit.

**Key Characteristics:**

| Characteristic | Description | Real-World Approximation |
|----------------|-------------|-------------------------|
| **Many buyers and sellers** | No single entity affects price | Agricultural commodities |
| **Homogeneous products** | Identical goods from all sellers | Wheat, oil, currency |
| **Perfect information** | All know prices and quality | Spot commodity exchanges, foreign exchange |
| **Free entry and exit** | No barriers to participation | Street food vendors |
| **Price takers** | Firms accept market price | Small farmers |

**A Note on "Perfect" Competition:**
No real market is perfectly competitive—this is a theoretical benchmark. Stock markets, despite being efficient, exhibit significant information asymmetry (insider knowledge, analyst research). Agricultural commodities come closest because products are standardized and prices are publicly posted.

### 6.2 Short-Run Profit Maximization

**The Profit-Maximizing Rule:**
Produce where MR = MC (or where P = MC in perfect competition, since P = MR)

**Profit Calculation:**
```
Economic Profit = Total Revenue - Total Cost
                = (P × Q) - (ATC × Q)
                = (P - ATC) × Q
```

**Three Outcomes:**
| Condition | Outcome |
|-----------|---------|
| P > ATC | Economic profit |
| P = ATC | Normal profit (break-even) |
| P < ATC | Economic loss |

### 6.3 The Shut-Down Decision

**Short-Run Shut-Down Rule:**
Shut down if P < AVC (price doesn't cover variable costs)

**Logic:**
- If P > AVC: Operating loss is less than fixed costs
- If P < AVC: Operating loss exceeds fixed costs—better to shut down

### 6.4 Long-Run Equilibrium

**The Zero-Profit Condition:**
In long-run equilibrium, economic profit = 0 for all firms.

**How It Works:**
1. If profits exist → New firms enter → Supply increases → Price falls
2. If losses exist → Firms exit → Supply decreases → Price rises
3. Entry/exit continues until P = ATC for remaining firms

### Interactive Tool 6.1: Firm Profit Analyzer

**Purpose**: Visualize profit maximization and market outcomes.

**Features:**
- Set market price and cost curves
- Find profit-maximizing output
- Calculate and display profit/loss area
- Show shut-down decision point
- Compare multiple firms with different costs
- Short-run to long-run transition animation

### Interactive Tool 6.2: Market Entry/Exit Simulator

**Purpose**: Understand long-run competitive dynamics.

**Features:**
- Start with initial market conditions
- Introduce profit or loss conditions
- Watch firms enter or exit over time
- See market supply curve shift
- Observe price movement toward equilibrium
- Time controls (speed up/slow down adjustment)

### Real-World Scenario 6.1: The Organic Egg Market

**Case Study**: Small egg producers in a competitive market.

**Analysis:**
- Why individual farmers can't set prices
- How input cost changes affect the market
- Entry of new organic farms
- Long-run price predictions

### Knowledge Check 6

12 questions on:
- Perfect competition characteristics
- Profit maximization
- Shut-down decision
- Long-run equilibrium
- Entry/exit dynamics

### Downloadable Resources

- **Calculator**: Profit/Loss Calculator
- **Reference**: Perfect Competition Decision Rules
- **Template**: Competitive Market Analysis

---

# PART III: MARKET STRUCTURES (Post-MVP)

## Module 7: Monopoly

**Learning Objectives:**
- Identify sources of monopoly power
- Determine monopoly pricing and output
- Analyze monopoly welfare effects (deadweight loss)
- Evaluate price discrimination strategies
- Understand antitrust policy

### Content Preview

- Single seller, unique product, barriers to entry
- MR < P due to downward-sloping demand
- Profit maximization at MR = MC
- Deadweight loss from reduced output
- First, second, and third-degree price discrimination
- Natural monopolies and regulation

### Interactive Tools (Post-MVP)

- **Monopoly Profit Calculator**: Find profit-maximizing P and Q
- **Price Discrimination Simulator**: Compare uniform vs. discriminatory pricing
- **Deadweight Loss Visualizer**: Measure welfare costs of monopoly

---

## Module 8: Monopolistic Competition

**Learning Objectives:**
- Distinguish monopolistic competition from other structures
- Understand product differentiation strategies
- Analyze advertising and branding decisions
- Explain excess capacity in the long run

### Content Preview

- Many firms, differentiated products, free entry
- Short-run monopoly behavior
- Long-run zero profit with excess capacity
- Role of advertising and branding
- Product differentiation strategies

---

## Module 9: Oligopoly and Strategic Behavior

**Learning Objectives:**
- Identify oligopoly characteristics
- Apply game theory to strategic decisions
- Understand Nash equilibrium
- Analyze cartels and collusion
- Evaluate real-world competitive strategies

### Content Preview

- Few firms, interdependent decisions
- Game theory foundations (prisoner's dilemma)
- Nash equilibrium
- Kinked demand curve model
- Cournot and Bertrand competition
- Collusion and cartels

### Interactive Tools (Post-MVP)

- **Game Theory Simulator**: Play strategic games
- **Oligopoly Competition Game**: Multi-player market simulation
- **Cartel Stability Analyzer**: Why cartels tend to break down

---

## Module 10: Labor Markets

**Learning Objectives:**
- Apply supply and demand to labor markets
- Calculate marginal revenue product
- Understand wage determination
- Analyze minimum wage and labor market interventions
- Evaluate human capital investment decisions

### Content Preview

- Derived demand for labor
- Marginal revenue product = MR × MP
- Labor supply decisions (work vs. leisure)
- Wage differentials (compensating, skill, discrimination)
- Minimum wage analysis
- Labor unions and collective bargaining

---

# PART IV: MARKET FAILURES AND POLICY (Post-MVP)

## Module 11: Market Failures

**Learning Objectives:**
- Identify different types of market failures
- Analyze externalities (positive and negative)
- Understand public goods and free-rider problems
- Evaluate solutions to market failures
- Apply Coase theorem to externality problems

### Content Preview

- When markets fail to achieve efficiency
- Negative externalities (pollution, congestion)
- Positive externalities (education, vaccinations)
- Public goods and common resources
- Information asymmetries
- Coase theorem and property rights

### Interactive Tools (Post-MVP)

- **Externality Calculator**: Quantify external costs/benefits
- **Public Goods Game**: Experience free-rider problem
- **Carbon Tax Simulator**: Policy intervention analysis

---

## Module 12: Government Intervention

**Learning Objectives:**
- Analyze effects of price controls
- Understand tax incidence and efficiency
- Evaluate trade policies (tariffs, quotas)
- Compare policy approaches to market failures
- Assess cost-benefit of regulation

### Content Preview

- Price ceilings (rent control, usury laws)
- Price floors (minimum wage, agricultural supports)
- Tax incidence (who really pays?)
- Deadweight loss of taxation
- Trade restrictions and protectionism
- Regulatory approaches

---

## Appendices

### Glossary
Complete definitions of all economic terms introduced

### Formula Reference
All mathematical formulas used in the course

### Graph Templates
Blank supply/demand, cost curve, and market structure graphs

### Recommended Reading
Books and resources for further study

---

## Technical Requirements

### Development Stack
- Astro + React (consistent with existing tools)
- Recharts for interactive graphs
- Framer Motion for animations
- Zustand for state management
- localStorage for progress persistence

### Interactive Features
- Draggable graph elements (curves, points)
- Real-time calculation updates
- Step-by-step guided analysis
- Multiple visualization modes (graph, table, animation)

### Accessibility
- WCAG AA compliance
- Screen reader support for graphs
- Keyboard navigation for all interactions
- High contrast mode

---

## Timeline Estimate

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 1 | 3 weeks | Modules 1-3, Supply/Demand Simulator |
| Phase 2 | 3 weeks | Modules 4-6, Consumer/Producer tools |
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
