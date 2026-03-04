import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { User, Target, Save, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../constants/theme';

export default function ProfileScreen() {
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState({
        steps: '10000',
        calories: '800',
        water: '2.5',
        weight: '70'
    });
    const [fitPoints, setFitPoints] = useState(0);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const savedGoals = await AsyncStorage.getItem('@user_goals');
            if (savedGoals !== null) {
                setGoals(JSON.parse(savedGoals));
            }

            const pointsData = await AsyncStorage.getItem('@fit_points');
            if (pointsData !== null) {
                const { points } = JSON.parse(pointsData);
                setFitPoints(points || 0);
            }
        } catch (e) {
            console.error('Veri islenemedi', e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('@user_goals', JSON.stringify(goals));
            Alert.alert("Başarılı", "Hedefleriniz cihazınıza başarıyla kaydedildi!");
        } catch (e) {
            Alert.alert("Hata", "Hedefler kaydedilirken bir sorun oluştu.");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={THEME.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <User color={THEME.colors.primary} size={40} />
                    </View>
                    <Text style={styles.name}>Ali Yılmaz</Text>
                    <Text style={styles.memberSince}>FitRota Üyesi</Text>

                    <View style={styles.pointsBadge}>
                        <Star color={THEME.colors.warning} size={20} fill={THEME.colors.warning} />
                        <Text style={styles.pointsText}>{fitPoints} Fit Puan</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Target color={THEME.colors.primary} size={24} />
                        <Text style={styles.sectionTitle}>Günlük Hedeflerim</Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Günlük Adım Hedefi</Text>
                        <TextInput
                            style={styles.input}
                            value={goals.steps}
                            onChangeText={(text) => setGoals({ ...goals, steps: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Aktif Kalori Yakımı (kcal)</Text>
                        <TextInput
                            style={styles.input}
                            value={goals.calories}
                            onChangeText={(text) => setGoals({ ...goals, calories: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Su Tüketimi (Litre)</Text>
                        <TextInput
                            style={styles.input}
                            value={goals.water}
                            onChangeText={(text) => setGoals({ ...goals, water: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Güncel Kilo (kg)</Text>
                        <TextInput
                            style={styles.input}
                            value={goals.weight}
                            onChangeText={(text) => setGoals({ ...goals, weight: text })}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Save color={THEME.colors.surface} size={20} />
                        <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
                    </TouchableOpacity>
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
    profileHeader: {
        alignItems: 'center',
        marginVertical: THEME.spacing.xl,
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: THEME.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: THEME.spacing.md,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80',
    },
    name: {
        ...THEME.typography.header,
        marginBottom: 4,
    },
    memberSince: {
        ...THEME.typography.body,
        color: THEME.colors.textLight,
        marginBottom: THEME.spacing.md,
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.primaryLight,
        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.sm,
        borderRadius: THEME.borderRadius.xxl,
        ...THEME.shadows.soft,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.colors.primary,
        marginLeft: THEME.spacing.sm,
    },
    section: {
        backgroundColor: THEME.colors.surface,
        borderRadius: THEME.borderRadius.lg,
        padding: THEME.spacing.lg,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '60',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: THEME.spacing.lg,
    },
    sectionTitle: {
        ...THEME.typography.title,
        marginLeft: THEME.spacing.sm,
    },
    formGroup: {
        marginBottom: THEME.spacing.md,
    },
    label: {
        ...THEME.typography.caption,
        marginBottom: THEME.spacing.xs,
        color: THEME.colors.text,
        fontWeight: '500',
    },
    input: {
        backgroundColor: THEME.colors.background,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: THEME.borderRadius.md,
        padding: THEME.spacing.lg, // Daha geniş input
        fontSize: 16,
        color: THEME.colors.text,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: THEME.colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: THEME.spacing.lg,
        borderRadius: THEME.borderRadius.lg,
        marginTop: THEME.spacing.xl,
        ...THEME.shadows.soft,
    },
    saveButtonText: {
        color: THEME.colors.surface,
        fontSize: 18,
        fontWeight: '900',
        marginLeft: THEME.spacing.sm,
        letterSpacing: 0.5,
    }
});
