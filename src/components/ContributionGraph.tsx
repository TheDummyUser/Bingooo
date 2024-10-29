import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

type ContributionDay = {
  date: string;
  count: number;
};

type ContributionGraphProps = {
  data: ContributionDay[];
  onDayPress?: (date: string) => void;
};

const ContributionGraph: React.FC<ContributionGraphProps> = ({ data, onDayPress }) => {
  const [pressedDates, setPressedDates] = useState<Set<string>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const screenWidth = Dimensions.get('window').width;
  const daySize = 10;
  const dayMargin = 2;
  const totalDayWidth = daySize + (dayMargin * 2);

  const isLastDayOfMonth = (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.getMonth() !== date.getMonth();
  };

  const getColor = (count: number, date: Date, dateString: string) => {
    if (pressedDates.has(dateString)) return '#ff69b4'; // Pink for pressed dates
    if (isLastDayOfMonth(date)) return '#ff9999'; // Pale red for last day of month
    if (count === 0) return '#161b22';
    if (count < 5) return '#0e4429';
    if (count < 10) return '#006d32';
    if (count < 15) return '#26a641';
    return '#39d353';
  };

  const handleDayPress = (dateString: string) => {
    const newPressedDates = new Set(pressedDates);
    if (newPressedDates.has(dateString)) {
      newPressedDates.delete(dateString);
    } else {
      newPressedDates.add(dateString);
    }
    setPressedDates(newPressedDates);
    if (onDayPress) {
      onDayPress(dateString);
    }
  };

  const renderWeek = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      const day = data.find(d => d.date === dateString);
      const color = getColor(day ? day.count : 0, currentDate, dateString);
      days.push(
        <TouchableOpacity
          key={dateString}
          onPress={() => handleDayPress(dateString)}
          accessibilityLabel={`Contributions on ${dateString}: ${day ? day.count : 0}`}
        >
          <View style={[styles.day, { backgroundColor: color }]} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.week}>{days}</View>;
  };

  const renderMonths = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthLabels = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from last Sunday

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(startDate);
      monthDate.setMonth(startDate.getMonth() + i);
      const leftPosition = i * (totalDayWidth * 4.3); // Approximate width per month

      monthLabels.push(
        <Text key={months[i]} style={[styles.monthText, { left: leftPosition }]}>
          {months[i]}
        </Text>
      );
    }

    return <View style={styles.months}>{monthLabels}</View>;
  };

  const renderGraph = () => {
    const weeks = [];
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from last Sunday

    for (let i = 0; i < 53; i++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + (i * 7));
      weeks.push(renderWeek(weekStartDate));
    }
    return weeks;
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [contentWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(width) => setContentWidth(width)}
        >
          <View>
            {renderMonths()}
            <View style={styles.graph}>
              {renderGraph()}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    padding: 16,
  },
  graphContainer: {
    flexDirection: 'row',
  },
  months: {
    flexDirection: 'row',
    position: 'absolute',
    top: -20,
    left: 32,
    height: 20,
  },
  monthText: {
    color: '#8b949e',
    fontSize: 12,
    position: 'absolute',
  },
  graph: {
    flexDirection: 'row',
    marginTop: 20,
  },
  week: {
    flexDirection: 'column',
  },
  day: {
    width: 10,
    height: 10,
    margin: 2,
    borderRadius: 2,
  },
});

export default ContributionGraph;
