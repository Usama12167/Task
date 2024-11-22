import React from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const styles = () =>
    StyleSheet.create({
      container: {flex: 1},
      map: {flex: 2},
      listContainer: {flex: 1, padding: 10},
      header: {fontWeight: 'bold', fontSize: 16, marginBottom: 10},
      item: {fontSize: 14, marginBottom: 5},
    });
  return React.useMemo(() => styles(), []);
};
