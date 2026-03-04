import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

export default function StatCard({ title, value, goal, unit, icon, color, onPress }) {
    const progress = Math.min(100, Math.max(0, (value / goal) * 100));

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                    {icon}
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.valueRow}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.separator}>/</Text>
                    <Text style={styles.goal}>{goal}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
                <Text style={styles.percentage}>{Math.round(progress)}%</Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${progress}%`, backgroundColor: color }
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: THEME.colors.surface,
        borderRadius: THEME.borderRadius.lg,
        padding: THEME.spacing.lg,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80', // Çok hafif saydam çerçeve
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: THEME.spacing.md,
    },
    iconContainer: {
        marginRight: THEME.spacing.md,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...THEME.typography.title,
        flex: 1,
        color: THEME.colors.textLight,
        fontSize: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: THEME.spacing.md,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    value: {
        fontSize: 32,
        fontWeight: '900',
        color: THEME.colors.text,
        letterSpacing: -1,
    },
    separator: {
        fontSize: 18,
        color: THEME.colors.border,
        marginHorizontal: 4,
    },
    goal: {
        fontSize: 18,
        color: THEME.colors.textLight,
        fontWeight: '600',
    },
    unit: {
        fontSize: 14,
        color: THEME.colors.textLight,
        marginLeft: 4,
        fontWeight: '500',
    },
    percentage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    progressTrack: {
        height: 10,
        backgroundColor: THEME.colors.border,
        borderRadius: THEME.borderRadius.round,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: THEME.borderRadius.round,
    }
});
