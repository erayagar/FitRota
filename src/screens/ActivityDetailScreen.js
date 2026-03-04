import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Activity, Flame, Droplets, Target, Award } from 'lucide-react-native';
import { THEME } from '../constants/theme';

export default function ActivityDetailScreen({ route }) {
    const { type, activityId } = route.params || {};

    // Mock Data Logic based on param
    let title = "Detaylar";
    let icon = <Award color={THEME.colors.primary} size={48} />;
    let color = THEME.colors.primary;
    let stats = [];

    if (type === 'steps') {
        title = "Adım Özeti";
        color = THEME.colors.primary;
        icon = <Activity color={color} size={48} />;
        stats = [
            { label: 'Bugün', value: '6,432', sub: 'Adım' },
            { label: 'Mesafe', value: '4.8', sub: 'km' },
            { label: 'Süre', value: '55', sub: 'dk' },
        ];
    } else if (type === 'calories') {
        title = "Kalori Cetveli";
        color = THEME.colors.danger;
        icon = <Flame color={color} size={48} />;
        stats = [
            { label: 'Yakılan', value: '450', sub: 'kcal' },
            { label: 'Alınan', value: '1850', sub: 'kcal' },
            { label: 'Hedef', value: '800', sub: 'kcal (Yakma)' },
        ];
    } else if (type === 'water') {
        title = "Su Tüketimi";
        color = THEME.colors.secondary;
        icon = <Droplets color={color} size={48} />;
        stats = [
            { label: 'İçilen', value: '1.5', sub: 'Litre' },
            { label: 'Kalan', value: '1.0', sub: 'Litre' },
            { label: 'Bardak', value: '6/10', sub: 'Adet' },
        ];
    } else if (activityId) {
        title = "Aktivite Sonucu";
        color = THEME.colors.primary;
        icon = <Target color={color} size={48} />;
        stats = [
            { label: 'Süre', value: '30', sub: 'dk' },
            { label: 'Kalori', value: '150', sub: 'kcal' },
            { label: 'Nabız', value: '120', sub: 'bpm (ort)' },
        ];
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerCard}>
                    <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
                        {icon}
                    </View>
                    <Text style={styles.mainTitle}>{title}</Text>
                    <Text style={styles.subtitle}>Günlük Rapor</Text>
                </View>

                <View style={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statBox}>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={[styles.statValue, { color: color }]}>{stat.value}</Text>
                            <Text style={styles.statSub}>{stat.sub}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Günün Tavsiyesi</Text>
                    <Text style={styles.infoBody}>
                        Hedeflerinize ulaşmak için çok iyi gidiyorsunuz! Temponuzu bozmadan
                        devam edin ve dinlenmeye zaman ayırmayı unutmayın.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    container: {
        padding: THEME.spacing.lg,
    },
    headerCard: {
        backgroundColor: THEME.colors.surface,
        padding: THEME.spacing.xxl,
        borderRadius: THEME.borderRadius.lg,
        alignItems: 'center',
        marginBottom: THEME.spacing.lg,
        ...THEME.shadows.card,
    },
    iconWrapper: {
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: THEME.spacing.md,
    },
    mainTitle: {
        ...THEME.typography.header,
        marginBottom: THEME.spacing.xs,
    },
    subtitle: {
        ...THEME.typography.body,
        color: THEME.colors.textLight,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: THEME.spacing.lg,
    },
    statBox: {
        flex: 1,
        backgroundColor: THEME.colors.surface,
        padding: THEME.spacing.md,
        borderRadius: THEME.borderRadius.md,
        marginHorizontal: THEME.spacing.xs,
        alignItems: 'center',
        ...THEME.shadows.card,
    },
    statLabel: {
        ...THEME.typography.caption,
        marginBottom: THEME.spacing.sm,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: THEME.spacing.xs,
    },
    statSub: {
        fontSize: 12,
        color: THEME.colors.textLight,
    },
    infoCard: {
        backgroundColor: THEME.colors.primaryLight,
        padding: THEME.spacing.lg,
        borderRadius: THEME.borderRadius.md,
        borderLeftWidth: 4,
        borderLeftColor: THEME.colors.primary,
    },
    infoTitle: {
        ...THEME.typography.title,
        color: THEME.colors.text,
        marginBottom: THEME.spacing.sm,
    },
    infoBody: {
        ...THEME.typography.body,
        lineHeight: 22,
    }
});
