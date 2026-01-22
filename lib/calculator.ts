// 財富自由計算核心邏輯

export interface CalculatorInputs {
  monthlyExpenses: number; // 每月生活費
  currentAssets: number; // 目前資產
  monthlyInvestment: number; // 每月投資金額
  annualReturnRate: number; // 年化報酬率 (%)
  investmentYears: number; // 投資年數
  withdrawalRate: number; // 提領率 (%)
}

export interface YearlyData {
  year: number;
  startAssets: number; // 年初資產
  annualContribution: number; // 年投入
  annualReturn: number; // 年報酬
  endAssets: number; // 年末資產
}

export interface CalculationResult {
  fiNumber: number; // 財富自由目標金額
  annualExpenses: number; // 年支出
  finalAssets: number; // 最終資產
  isAchievable: boolean; // 是否可達成
  yearsToFI: number | null; // 預計達成時間（年）
  yearlyData: YearlyData[]; // 年度資產成長表格
}

/**
 * 計算財富自由目標金額
 * FI Number = 年支出 ÷ 提領率
 */
export function calculateFINumber(
  annualExpenses: number,
  withdrawalRate: number,
): number {
  return annualExpenses / (withdrawalRate / 100);
}

/**
 * 計算年支出
 */
export function calculateAnnualExpenses(monthlyExpenses: number): number {
  return monthlyExpenses * 12;
}

/**
 * 使用複利 + 每月定期投入計算資產成長
 * 公式：FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
 * 其中 r 為月利率，n 為月數
 */
export function calculateAssetGrowth(
  currentAssets: number,
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number,
): YearlyData[] {
  const yearlyData: YearlyData[] = [];
  let assets = currentAssets;
  const monthlyRate = annualReturnRate / 100 / 12;

  for (let year = 1; year <= years; year++) {
    const startAssets = assets;
    const annualContribution = monthlyInvestment * 12;

    // 逐月計算複利
    for (let month = 1; month <= 12; month++) {
      assets = assets * (1 + monthlyRate) + monthlyInvestment;
    }

    const endAssets = assets;
    const annualReturn = endAssets - startAssets - annualContribution;

    yearlyData.push({
      year,
      startAssets: Math.round(startAssets),
      annualContribution: Math.round(annualContribution),
      annualReturn: Math.round(annualReturn),
      endAssets: Math.round(endAssets),
    });
  }

  return yearlyData;
}

/**
 * 計算達成財富自由所需年數
 */
export function calculateYearsToFI(
  currentAssets: number,
  monthlyInvestment: number,
  annualReturnRate: number,
  fiNumber: number,
): number | null {
  const maxYears = 100;
  let assets = currentAssets;
  const monthlyRate = annualReturnRate / 100 / 12;

  if (currentAssets >= fiNumber) {
    return 0;
  }

  for (let year = 1; year <= maxYears; year++) {
    for (let month = 1; month <= 12; month++) {
      assets = assets * (1 + monthlyRate) + monthlyInvestment;
    }

    if (assets >= fiNumber) {
      return year;
    }
  }

  return null; // 超過100年無法達成
}

/**
 * 主計算函數
 */
export function calculate(inputs: CalculatorInputs): CalculationResult {
  const annualExpenses = calculateAnnualExpenses(inputs.monthlyExpenses);
  const fiNumber = calculateFINumber(annualExpenses, inputs.withdrawalRate);
  const yearlyData = calculateAssetGrowth(
    inputs.currentAssets,
    inputs.monthlyInvestment,
    inputs.annualReturnRate,
    inputs.investmentYears,
  );
  const finalAssets =
    yearlyData.length > 0
      ? yearlyData[yearlyData.length - 1].endAssets
      : inputs.currentAssets;
  const isAchievable = finalAssets >= fiNumber;
  const yearsToFI = calculateYearsToFI(
    inputs.currentAssets,
    inputs.monthlyInvestment,
    inputs.annualReturnRate,
    fiNumber,
  );

  return {
    fiNumber: Math.round(fiNumber),
    annualExpenses: Math.round(annualExpenses),
    finalAssets: Math.round(finalAssets),
    isAchievable,
    yearsToFI,
    yearlyData,
  };
}

/**
 * 格式化金額顯示
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * 預設參數
 */
export const defaultInputs: CalculatorInputs = {
  monthlyExpenses: 25000, // 每月生活費 2.5 萬
  currentAssets: 1000000, // 目前資產 100 萬
  monthlyInvestment: 20000, // 每月投資 2 萬
  annualReturnRate: 7, // 年化報酬率 7%
  investmentYears: 20, // 投資 20 年
  withdrawalRate: 4, // 提領率 4%
};

// ========================
// Savings Calculator
// ========================

export interface SavingsCalculatorInputs {
  fiTarget: number; // 財富自由目標金額
  currentAssets: number; // 現存資產
  annualReturnRate: number; // 年化報酬率 (%)
  targetYears: number; // 目標年數
}

export interface SavingsRequirement {
  years: number;
  yearlyRequired: number;
  monthlyRequired: number;
  weeklyRequired: number;
  dailyRequired: number;
}

/**
 * 計算達成 FI Target 所需的每月投入金額
 * 使用 PMT 公式反推：PMT = (FV - PV * (1 + r)^n) / [((1 + r)^n - 1) / r]
 */
export function calculateRequiredMonthlySaving(
  fiTarget: number,
  currentAssets: number,
  annualReturnRate: number,
  years: number,
): number {
  if (years <= 0) return 0;

  const monthlyRate = annualReturnRate / 100 / 12;
  const months = years * 12;

  // 如果報酬率為 0，直接計算
  if (monthlyRate === 0) {
    const required = (fiTarget - currentAssets) / months;
    return Math.max(0, required);
  }

  // 計算現有資產在 n 個月後的未來價值
  const futureValueOfCurrentAssets =
    currentAssets * Math.pow(1 + monthlyRate, months);

  // 需要透過定期投入達成的金額
  const remainingTarget = fiTarget - futureValueOfCurrentAssets;

  // 如果現有資產已經足夠，不需要額外儲蓄
  if (remainingTarget <= 0) return 0;

  // 使用 PMT 公式計算每月投入
  // PMT = remainingTarget * r / ((1 + r)^n - 1)
  const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  const monthlyRequired = remainingTarget / factor;

  return Math.max(0, monthlyRequired);
}

/**
 * 計算 1-50 年的儲蓄需求表
 */
export function calculateSavingsTable(
  fiTarget: number,
  currentAssets: number,
  annualReturnRate: number,
): SavingsRequirement[] {
  const results: SavingsRequirement[] = [];

  for (let years = 1; years <= 50; years++) {
    const monthlyRequired = calculateRequiredMonthlySaving(
      fiTarget,
      currentAssets,
      annualReturnRate,
      years,
    );

    results.push({
      years,
      yearlyRequired: Math.round(monthlyRequired * 12),
      monthlyRequired: Math.round(monthlyRequired),
      weeklyRequired: Math.round((monthlyRequired * 12) / 52),
      dailyRequired: Math.round((monthlyRequired * 12) / 365),
    });
  }

  return results;
}

// ========================
// Expense Calculator
// ========================

export interface ExpenseItem {
  id: string;
  name: string;
  nameZh: string;
  monthlyAmount: number;
  yearlyAmount: number;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  nameZh: string;
  items: ExpenseItem[];
  yearlySubtotal: number;
}

export const expenseTemplate: Omit<ExpenseCategory, "yearlySubtotal">[] = [
  {
    id: "housing",
    name: "Housing",
    nameZh: "住房",
    items: [
      {
        id: "mortgage",
        name: "Mortgage / Rent",
        nameZh: "房貸/房租",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "property-taxes",
        name: "Property Taxes",
        nameZh: "房屋稅",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "maintenance",
        name: "Maintenance & Cleaning",
        nameZh: "維修與清潔",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "home-insurance",
        name: "Home / Renter's Insurance",
        nameZh: "住宅保險",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "electricity",
        name: "Electricity",
        nameZh: "電費",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "gas",
        name: "Oil / Gas",
        nameZh: "瓦斯/天然氣",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "water",
        name: "Water / Garbage / Sewer",
        nameZh: "水費/垃圾/污水",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "phone",
        name: "Phone",
        nameZh: "電話費",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "internet",
        name: "Cable / Internet",
        nameZh: "網路/有線電視",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "housing-other",
        name: "Other (vacation and hotels)",
        nameZh: "其他（住宿）",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "transportation",
    name: "Transportation",
    nameZh: "交通",
    items: [
      {
        id: "car-payment",
        name: "Car Payment",
        nameZh: "車貸",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "car-maintenance",
        name: "Maintenance / Repairs",
        nameZh: "保養/維修",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "fuel",
        name: "Gas / Oil",
        nameZh: "油費",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "registration",
        name: "License / Registration",
        nameZh: "牌照/規費",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "car-insurance",
        name: "Insurance",
        nameZh: "車險",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "public-transit",
        name: "Bus / Train Fare",
        nameZh: "大眾運輸",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "flights",
        name: "Flights (including vacation)",
        nameZh: "機票",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "ridesharing",
        name: "Taxis / Ridesharing",
        nameZh: "計程車/共乘",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    nameZh: "飲食",
    items: [
      {
        id: "groceries",
        name: "Groceries / Eat at home",
        nameZh: "食材/在家用餐",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "eating-out",
        name: "Eating Out",
        nameZh: "外食",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "apparel",
    name: "Apparel & Services",
    nameZh: "衣著與服務",
    items: [
      {
        id: "clothing",
        name: "Clothing & Shoes",
        nameZh: "服飾與鞋子",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "jewelry",
        name: "Jewelry",
        nameZh: "珠寶飾品",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "laundry",
        name: "Dry Cleaning / Laundry",
        nameZh: "乾洗/洗衣",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "insurance",
    name: "Insurance",
    nameZh: "保險",
    items: [
      {
        id: "healthcare",
        name: "Healthcare",
        nameZh: "健康保險",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "life-insurance",
        name: "Life and Personal Insurance",
        nameZh: "壽險與個人保險",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "pension",
        name: "Pension & Social Security",
        nameZh: "退休金與社會保險",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    nameZh: "娛樂",
    items: [
      {
        id: "pets",
        name: "Pets",
        nameZh: "寵物",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "hobbies",
        name: "Lessons / Hobbies",
        nameZh: "課程/興趣",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "memberships",
        name: "Memberships",
        nameZh: "會員訂閱",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "events",
        name: "Events",
        nameZh: "活動",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
  {
    id: "taxes",
    name: "Taxes",
    nameZh: "稅務",
    items: [
      {
        id: "income-tax",
        name: "Income Tax",
        nameZh: "所得稅",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
      {
        id: "other-taxes",
        name: "Other Taxes",
        nameZh: "其他稅務",
        monthlyAmount: 0,
        yearlyAmount: 0,
      },
    ],
  },
];

/**
 * 計算支出分類的年度小計
 */
export function calculateCategorySubtotal(items: ExpenseItem[]): number {
  return items.reduce((sum, item) => sum + item.yearlyAmount, 0);
}

/**
 * 計算總年度支出
 */
export function calculateTotalAnnualExpenses(
  categories: ExpenseCategory[],
): number {
  return categories.reduce((sum, category) => sum + category.yearlySubtotal, 0);
}

/**
 * 根據年數計算財富自由目標金額
 * FI Target = 年支出 × 年數
 */
export function calculateFITargetFromExpenses(
  annualExpenses: number,
  years: number,
): number {
  return annualExpenses * years;
}
