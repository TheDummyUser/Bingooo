import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import ContributionGraph from '@/components/ContributionGraph'
const Saved = () => {
  const contributionData = [
    { date: '2024-10-25', count: 5 },
    { date: '2024-10-26', count: 8 },
    // ... more data
  ];

  const handleDayPress = (date: string) => {
    console.log(`Day pressed: ${date}`);
    // You can add more logic here, such as updating app-wide state or navigating to a detail view
  };

  return (
    <MainView>
      <ContributionGraph data={contributionData} onDayPress={handleDayPress} />
    </MainView>
  )
}

export default Saved

const styles = StyleSheet.create({})