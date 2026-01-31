import {
    Document,
    Font,
    Page,
    StyleSheet,
    Text,
    View
} from '@react-pdf/renderer';

// Register fonts (optional)
Font.register({
  family: 'Inter',
  src: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#334155',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    padding: '8 0',
  },
  label: {
    width: '60%',
    color: '#475569',
  },
  value: {
    width: '40%',
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#1e293b',
    borderTopStyle: 'solid',
    padding: '12 0',
    marginTop: 10,
  },
  totalLabel: {
    width: '60%',
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalValue: {
    width: '40%',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1e293b',
  },
  positive: {
    color: '#059669',
  },
  negative: {
    color: '#dc2626',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    color: '#64748b',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
});

interface FinancialStatementPDFProps {
  data: any;
  type: 'income-statement' | 'balance-sheet' | 'cash-flow' | 'budget';
  title: string;
}

export function FinancialStatementPDF({ data, type, title }: FinancialStatementPDFProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderIncomeStatement = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Income</Text>
        {data.income?.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.value}>{formatCurrency(item.amount)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Income</Text>
          <Text style={styles.totalValue}>{formatCurrency(data.totals?.totalIncome || 0)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expenses</Text>
        {data.expenses?.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.value}>{formatCurrency(item.amount)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Expenses</Text>
          <Text style={styles.totalValue}>{formatCurrency(data.totals?.totalExpenses || 0)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Net Income</Text>
          <Text style={[
            styles.totalValue,
            (data.totals?.net || 0) >= 0 ? styles.positive : styles.negative
          ]}>
            {formatCurrency(data.totals?.net || 0)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderBalanceSheet = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assets</Text>
        {data.assets?.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.value}>{formatCurrency(item.value)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Assets</Text>
          <Text style={styles.totalValue}>{formatCurrency(data.totals?.totalAssets || 0)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liabilities</Text>
        {data.liabilities?.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.value}>{formatCurrency(item.value)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Liabilities</Text>
          <Text style={styles.totalValue}>{formatCurrency(data.totals?.totalLiabilities || 0)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Equity</Text>
          <Text style={[
            styles.totalValue,
            (data.totals?.equity || 0) >= 0 ? styles.positive : styles.negative
          ]}>
            {formatCurrency(data.totals?.equity || 0)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderCashFlow = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cash Flow Forecast - {data.year}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Starting Balance</Text>
          <Text style={styles.value}>{formatCurrency(data.startingBalance || 0)}</Text>
        </View>
      </View>

      {['operating', 'investing', 'financing'].map((category) => {
        const categoryItems = data.items?.filter((item: any) => item.category === category) || [];
        if (categoryItems.length === 0) return null;

        const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1) + ' Activities';

        return (
          <View style={styles.section} key={category}>
            <Text style={styles.sectionTitle}>{categoryLabel}</Text>
            {categoryItems.map((item: any, index: number) => (
              <View style={styles.row} key={index}>
                <Text style={styles.label}>
                  {item.name || 'Unnamed'} ({item.type === 'inflow' ? '+' : '-'})
                </Text>
                <Text style={[
                  styles.value,
                  item.type === 'inflow' ? styles.positive : styles.negative
                ]}>
                  {formatCurrency(item.amount || 0)}
                </Text>
              </View>
            ))}
          </View>
        );
      })}

      <View style={styles.section}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Net Cash Flow</Text>
          <Text style={[
            styles.totalValue,
            (data.totals?.netCashFlow || 0) >= 0 ? styles.positive : styles.negative
          ]}>
            {formatCurrency(data.totals?.netCashFlow || 0)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Ending Balance</Text>
          <Text style={styles.totalValue}>{formatCurrency(data.totals?.endingBalance || 0)}</Text>
        </View>
      </View>
    </View>
  );

  const renderBudget = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget - {data.month}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Income</Text>
          <Text style={styles.value}>{formatCurrency(data.income || 0)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Methodology</Text>
          <Text style={styles.value}>{data.methodology || 'Traditional'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Items</Text>
        <View style={[styles.row, { backgroundColor: '#f1f5f9' }]}>
          <Text style={[styles.label, { width: '40%', fontWeight: 'bold' }]}>Category</Text>
          <Text style={[styles.value, { width: '30%', fontWeight: 'bold' }]}>Planned</Text>
          <Text style={[styles.value, { width: '30%', fontWeight: 'bold' }]}>Actual</Text>
        </View>
        {data.items?.map((item: any, index: number) => (
          <View style={styles.row} key={index}>
            <Text style={[styles.label, { width: '40%' }]}>
              {item.category?.replace('-', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Other'}
            </Text>
            <Text style={[styles.value, { width: '30%' }]}>{formatCurrency(item.planned || 0)}</Text>
            <Text style={[styles.value, { width: '30%' }]}>{formatCurrency(item.actual || 0)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, { width: '40%' }]}>Totals</Text>
          <Text style={[styles.totalValue, { width: '30%' }]}>
            {formatCurrency(data.totals?.planned || 0)}
          </Text>
          <Text style={[styles.totalValue, { width: '30%' }]}>
            {formatCurrency(data.totals?.actual || 0)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Remaining (Income - Actual)</Text>
          <Text style={[
            styles.totalValue,
            (data.totals?.actualRemaining || 0) >= 0 ? styles.positive : styles.negative
          ]}>
            {formatCurrency(data.totals?.actualRemaining || 0)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          Generated on {formatDate(new Date().toISOString())}
        </Text>

        {type === 'income-statement' && renderIncomeStatement()}
        {type === 'balance-sheet' && renderBalanceSheet()}
        {type === 'cash-flow' && renderCashFlow()}
        {type === 'budget' && renderBudget()}

        <Text style={styles.footer}>
          Generated by Accounting Intro Platform - Educational purposes only
        </Text>
      </Page>
    </Document>
  );
}
