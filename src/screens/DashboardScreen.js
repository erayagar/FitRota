import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Activity, Flame, Droplets, ChevronRight, Plus, X, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../constants/theme';
import StatCard from '../components/StatCard';
import ConfettiOverlay from '../components/ConfettiOverlay';

const mockData = {
    steps: 6432,
    calories: 450,
    water: 1.5
};

const ACTIVITY_TYPES = [
    { id: '1', name: 'Koşu', icon: '🏃', calPerMin: 12 },
    { id: '2', name: 'Yürüyüş', icon: '🚶', calPerMin: 5 },
    { id: '3', name: 'Yüzme', icon: '🏊', calPerMin: 15 },
    { id: '4', name: 'Bisiklet', icon: '🚴', calPerMin: 10 },
    { id: '5', name: 'Yoga', icon: '🧘', calPerMin: 4 },
];

export default function DashboardScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [showConfetti, setShowConfetti] = useState(false);
    const [recentActivities, setRecentActivities] = useState([]);
    const [totalBurnedCals, setTotalBurnedCals] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [duration, setDuration] = useState('');

    // Oyunlaştırma State'leri
    const [fitPoints, setFitPoints] = useState(0);
    const [lastRewardDate, setLastRewardDate] = useState(null);

    const [goals, setGoals] = useState({
        steps: 10000,
        calories: 800,
        water: 2.5
    });

    useEffect(() => {
        if (isFocused) {
            loadGoals();
            loadActivities();
        }
    }, [isFocused]);

    const loadActivities = async () => {
        try {
            const savedActs = await AsyncStorage.getItem('@recent_activities');
            if (savedActs) {
                const parsedActivities = JSON.parse(savedActs);
                setRecentActivities(parsedActivities);

                // Calculate total calories burned
                const totalCals = parsedActivities.reduce((sum, act) => sum + (act.calories || 0), 0);
                setTotalBurnedCals(totalCals);
            }
        } catch (e) {
            console.log('Aktiviteler çekilemedi', e);
        }
    };

    const handleAddActivity = async () => {
        if (!selectedActivity || !duration) {
            Alert.alert('Eksik Bilgi', 'Lütfen bir aktivite tipi ve süre girin.');
            return;
        }

        const durationNum = parseInt(duration);
        if (isNaN(durationNum) || durationNum <= 0) {
            Alert.alert('Hatalı Süre', 'Geçerli bir dakika giriniz.');
            return;
        }

        const calculatedCals = selectedActivity.calPerMin * durationNum;

        const newActivity = {
            id: Date.now().toString(),
            name: selectedActivity.name,
            icon: selectedActivity.icon,
            duration: `${durationNum} dk`,
            calories: calculatedCals,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        };

        const updatedList = [newActivity, ...recentActivities];
        const newTotalCals = totalBurnedCals + calculatedCals;

        try {
            await AsyncStorage.setItem('@recent_activities', JSON.stringify(updatedList));
            setRecentActivities(updatedList);
            setTotalBurnedCals(newTotalCals);

            // OYUNLAŞTIRMA MANTIĞI: Yeni kalori hedefe ulaşıyorsa
            const todayStr = new Date().toDateString();
            if (newTotalCals >= goals.calories && lastRewardDate !== todayStr) {
                const newPoints = fitPoints + 50;
                setFitPoints(newPoints);
                setLastRewardDate(todayStr);

                await AsyncStorage.setItem('@fit_points', JSON.stringify({
                    points: newPoints,
                    lastDate: todayStr
                }));

                setShowConfetti(true);
                Alert.alert(
                    '🎉 TEBRİKLER!',
                    `Günlük kalori hedefine ulaştın!\n\n+50 Fit Puan kazandın. Toplam Puanın: ${newPoints} 🌟`
                );
            }

            setModalVisible(false);
            setDuration('');
            setSelectedActivity(null);
        } catch (e) {
            Alert.alert('Hata', 'Açıklama kaydedilirken sorun oluştu.');
        }
    };

    const loadGoals = async () => {
        try {
            const savedGoals = await AsyncStorage.getItem('@user_goals');
            if (savedGoals !== null) {
                const parsed = JSON.parse(savedGoals);
                setGoals({
                    steps: parseInt(parsed.steps) || 10000,
                    calories: parseInt(parsed.calories) || 800,
                    water: parseFloat(parsed.water) || 2.5,
                });
            }

            // Puan verilerini yükle
            const pointData = await AsyncStorage.getItem('@fit_points');
            if (pointData) {
                const { points, lastDate } = JSON.parse(pointData);
                setFitPoints(points || 0);
                setLastRewardDate(lastDate || null);
            }
        } catch (e) {
            console.log('Golleri/Puanı çekerken hata', e);
        }
    };

    const handleStatPress = (type, value, goal) => {
        // Oyunlaştırma: Eğer hedefe ulaşıldıysa veya yaklaşıldıysa konfeti göster
        if (value >= goal) {
            setShowConfetti(true);
        }
        // Her ihtimale karşı detaya git
        navigation.navigate('ActivityDetail', { type });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ConfettiOverlay
                isVisible={showConfetti}
                onAnimationFinish={() => setShowConfetti(false)}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Günaydın, Ali!</Text>
                        <Text style={styles.date}>Bugün, {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</Text>
                    </View>
                    <View style={styles.pointsBadge}>
                        <Star color={THEME.colors.warning} size={20} fill={THEME.colors.warning} />
                        <Text style={styles.pointsText}>{fitPoints}</Text>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        title="Adım"
                        value={mockData.steps}
                        goal={goals.steps}
                        unit="adım"
                        icon={<Activity color={THEME.colors.primary} size={24} />}
                        color={THEME.colors.primary}
                        onPress={() => handleStatPress('steps', mockData.steps, goals.steps)}
                    />
                    <StatCard
                        title="Kalori"
                        value={totalBurnedCals}
                        goal={goals.calories}
                        unit="kcal"
                        icon={<Flame color={THEME.colors.danger} size={24} />}
                        color={THEME.colors.danger}
                        onPress={() => handleStatPress('calories', totalBurnedCals, goals.calories)}
                    />
                    <StatCard
                        title="Su"
                        value={mockData.water}
                        goal={goals.water}
                        unit="L"
                        icon={<Droplets color={THEME.colors.secondary} size={24} />}
                        color={THEME.colors.secondary}
                        onPress={() => handleStatPress('water', mockData.water, goals.water)}
                    />
                </View>

                <View style={styles.activitySection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                            <Plus color={THEME.colors.primary} size={20} />
                            <Text style={styles.addButtonText}>Ekle</Text>
                        </TouchableOpacity>
                    </View>

                    {recentActivities.length > 0 ? (
                        recentActivities.map(activity => (
                            <TouchableOpacity
                                key={activity.id}
                                style={styles.activityItem}
                                onPress={() => navigation.navigate('ActivityDetail', { activityId: activity.id })}
                            >
                                <View style={styles.activityIcon}>
                                    <Text style={{ fontSize: 20 }}>{activity.icon || '🏃'}</Text>
                                </View>
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityName}>{activity.name}</Text>
                                    <Text style={styles.activityTime}>{activity.time} • {activity.duration}</Text>
                                </View>
                                <View style={styles.activityRight}>
                                    <Text style={styles.activityCalories}>{activity.calories} kcal</Text>
                                    <ChevronRight color={THEME.colors.textLight} size={20} />
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>Henüz bir aktivite eklemediniz.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Aktivite Ekleme Modalı */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Aktivite Ekle</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color={THEME.colors.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.inputLabel}>Aktivite Türü</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
                            {ACTIVITY_TYPES.map(type => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.typeButton, selectedActivity?.id === type.id && styles.typeButtonActive]}
                                    onPress={() => setSelectedActivity(type)}
                                >
                                    <Text style={styles.typeIcon}>{type.icon}</Text>
                                    <Text style={[styles.typeText, selectedActivity?.id === type.id && styles.typeTextActive]}>{type.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.inputLabel}>Süre (Dakika)</Text>
                        <TextInput
                            style={styles.durationInput}
                            keyboardType="numeric"
                            placeholder="Örn: 45"
                            value={duration}
                            onChangeText={setDuration}
                            maxLength={3}
                        />

                        {selectedActivity && duration ? (
                            <Text style={styles.estCalText}>
                                Tahmini Yakım: <Text style={{ fontWeight: 'bold', color: THEME.colors.danger }}>{selectedActivity.calPerMin * parseInt(duration || 0)} kcal</Text>
                            </Text>
                        ) : null}

                        <TouchableOpacity style={styles.saveButton} onPress={handleAddActivity}>
                            <Text style={styles.saveButtonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.spacing.xl,
        marginTop: THEME.spacing.lg,
    },
    greeting: {
        ...THEME.typography.header,
        marginBottom: THEME.spacing.sm,
    },
    date: {
        ...THEME.typography.body,
        color: THEME.colors.textLight,
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.surface,
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        borderRadius: THEME.borderRadius.round,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80',
    },
    pointsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginLeft: THEME.spacing.xs,
    },
    statsGrid: {
        gap: THEME.spacing.md,
        marginBottom: THEME.spacing.xl,
    },
    activitySection: {
        marginTop: THEME.spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.spacing.md,
    },
    sectionTitle: {
        ...THEME.typography.title,
    },
    seeAll: {
        color: THEME.colors.primary,
        fontWeight: '600',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.surface,
        padding: THEME.spacing.lg,
        borderRadius: THEME.borderRadius.lg,
        marginBottom: THEME.spacing.md,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80', // Glass effect
    },
    activityIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: THEME.colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: THEME.spacing.lg,
    },
    activityInfo: {
        flex: 1,
    },
    activityName: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.colors.text,
        marginBottom: 4,
    },
    activityTime: {
        ...THEME.typography.caption,
    },
    activityRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activityCalories: {
        fontWeight: '600',
        color: THEME.colors.text,
        marginRight: THEME.spacing.sm,
    },
    emptyState: {
        padding: THEME.spacing.xxl,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.colors.surface,
        borderRadius: THEME.borderRadius.lg,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80',
    },
    emptyText: {
        color: THEME.colors.textLight,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        backgroundColor: THEME.colors.primaryLight,
        borderRadius: THEME.borderRadius.xxl,
        ...THEME.shadows.soft,
    },
    addButtonText: {
        color: THEME.colors.primary,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: THEME.colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: THEME.spacing.xl,
        minHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.spacing.lg,
    },
    modalTitle: {
        ...THEME.typography.header,
        fontSize: 22,
    },
    inputLabel: {
        ...THEME.typography.title,
        color: THEME.colors.text,
        marginBottom: THEME.spacing.sm,
        marginTop: THEME.spacing.md,
    },
    typeSelector: {
        flexDirection: 'row',
        marginBottom: THEME.spacing.md,
    },
    typeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.colors.surface,
        borderWidth: 2,
        borderColor: THEME.colors.border + '80',
        borderRadius: THEME.borderRadius.lg,
        padding: THEME.spacing.lg,
        marginRight: THEME.spacing.md,
        minWidth: 90,
        ...THEME.shadows.soft,
    },
    typeButtonActive: {
        borderColor: THEME.colors.primary,
        backgroundColor: THEME.colors.primaryLight,
        transform: [{ scale: 1.05 }], // Aktifken Pop-out efekti
    },
    typeIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    typeText: {
        fontWeight: '600',
        color: THEME.colors.textLight,
    },
    typeTextActive: {
        color: THEME.colors.primary,
    },
    durationInput: {
        backgroundColor: THEME.colors.surface,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: THEME.borderRadius.md,
        padding: THEME.spacing.lg,
        fontSize: 18,
        marginBottom: THEME.spacing.md,
    },
    estCalText: {
        textAlign: 'center',
        fontSize: 16,
        color: THEME.colors.text,
        marginVertical: THEME.spacing.md,
    },
    saveButton: {
        backgroundColor: THEME.colors.primary,
        padding: THEME.spacing.xl,
        borderRadius: THEME.borderRadius.lg,
        alignItems: 'center',
        marginTop: THEME.spacing.xl,
        ...THEME.shadows.card,
    },
    saveButtonText: {
        color: THEME.colors.surface,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 0.5,
    }
});
