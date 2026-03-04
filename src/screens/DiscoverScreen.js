import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { THEME } from '../constants/theme';
import { Clock, Flame, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Yapay Zeka (AI) destekli Yüksek Kaliteli Yerel (Local) assets görselleri
const MOCK_DATA = {
    diets: [
        {
            id: 'd1',
            title: 'Aralıklı Oruç (16:8)',
            desc: 'Hücre yenilenmesini destekleyen en popüler IF diyeti.',
            image: require('../../assets/images/content/diet2.png'),
            calories: '1500 kcal',
            time: '14 Gün'
        },
        {
            id: 'd2',
            title: 'Yüksek Protein Menüsü',
            desc: 'Kas kütlesini artırmaya yönelik sporcu beslenmesi.',
            image: require('../../assets/images/content/diet2.png'),
            calories: '2200 kcal',
            time: '30 Gün'
        }
    ],
    exercises: [
        {
            id: 'e1',
            title: 'Evde Tüm Vücut',
            desc: 'Ekipmansız HIIT antrenmanı ile yağ yakımını hızlandırın.',
            image: require('../../assets/images/content/workout1.png'),
            duration: '25 dk',
            burn: '300 kcal'
        },
        {
            id: 'e2',
            title: 'Rahatlatıcı Yoga Akışı',
            desc: 'Sabah esnemeleri ve gün sonu stresi için ideal pozlar.',
            image: require('../../assets/images/content/yoga1.png'),
            duration: '40 dk',
            burn: '150 kcal'
        }
    ],
    blogs: [
        {
            id: 'b1',
            title: 'Suyun Vücuda 5 Mucizevi Etkisi',
            desc: 'Günlük su tüketiminin cilt ve metabolizma üzerindeki bilime dayalı faydaları.',
            image: require('../../assets/images/content/water1.png'),
            readTime: '3 dk'
        },
        {
            id: 'b2',
            title: 'Şekeri Bırakmanın Yolları',
            desc: 'Neden şekere bağımlıyız ve bu döngüyü nasıl kırabiliriz?',
            image: require('../../assets/images/content/sugar1.png'),
            readTime: '5 dk'
        }
    ]
};

export default function DiscoverScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('diets');

    const tabs = [
        { id: 'diets', label: 'Diyetler' },
        { id: 'exercises', label: 'Egzersizler' },
        { id: 'blogs', label: 'Blog' },
    ];

    const renderCard = (item, type) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ArticleDetail', { type, id: item.id })}
            >
                <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>

                    <View style={styles.cardFooter}>
                        {type === 'diets' && (
                            <>
                                <View style={styles.badge}><Flame size={14} color={THEME.colors.danger} /><Text style={styles.badgeText}>{item.calories}</Text></View>
                                <View style={styles.badge}><Clock size={14} color={THEME.colors.textLight} /><Text style={styles.badgeText}>{item.time}</Text></View>
                            </>
                        )}
                        {type === 'exercises' && (
                            <>
                                <View style={styles.badge}><Clock size={14} color={THEME.colors.textLight} /><Text style={styles.badgeText}>{item.duration}</Text></View>
                                <View style={styles.badge}><Flame size={14} color={THEME.colors.danger} /><Text style={styles.badgeText}>{item.burn}</Text></View>
                            </>
                        )}
                        {type === 'blogs' && (
                            <View style={styles.badge}><Clock size={14} color={THEME.colors.textLight} /><Text style={styles.badgeText}>{item.readTime} Okuma</Text></View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Keşfet</Text>
                <Text style={styles.headerSubtitle}>Sizin için seçilen harika içerikler</Text>
            </View>

            <View style={styles.tabContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {activeTab === 'diets' && MOCK_DATA.diets.map(item => renderCard(item, 'diets'))}
                {activeTab === 'exercises' && MOCK_DATA.exercises.map(item => renderCard(item, 'exercises'))}
                {activeTab === 'blogs' && MOCK_DATA.blogs.map(item => renderCard(item, 'blogs'))}
                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    header: {
        padding: THEME.spacing.lg,
        paddingBottom: THEME.spacing.sm,
        backgroundColor: THEME.colors.background, // Beyaz yerine tema arka planı
    },
    headerTitle: {
        ...THEME.typography.header,
        fontSize: 32, // Daha büyük çarpıcı başlık
    },
    headerSubtitle: {
        ...THEME.typography.body,
        color: THEME.colors.textLight,
        fontWeight: '500',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: THEME.spacing.lg,
        paddingVertical: THEME.spacing.md,
        backgroundColor: THEME.colors.background,
    },
    tabButton: {
        marginRight: THEME.spacing.sm,
        paddingVertical: THEME.spacing.sm,
        paddingHorizontal: THEME.spacing.lg,
        borderRadius: THEME.borderRadius.xxl,
        backgroundColor: THEME.colors.surface,
        borderWidth: 1,
        borderColor: THEME.colors.border + '80',
        ...THEME.shadows.soft,
    },
    activeTab: {
        backgroundColor: THEME.colors.text, // Siyah yüksek kontrastlı buton
        borderColor: THEME.colors.text,
    },
    tabText: {
        fontWeight: '700',
        color: THEME.colors.textLight,
        fontSize: 15,
    },
    activeTabText: {
        color: THEME.colors.surface,
    },
    scrollContent: {
        padding: THEME.spacing.lg,
    },
    card: {
        backgroundColor: THEME.colors.surface,
        borderRadius: THEME.borderRadius.lg,
        marginBottom: THEME.spacing.xl, // Kartlar arası daha fazla boşluk
        overflow: 'hidden',
        ...THEME.shadows.card,
        borderWidth: 1,
        borderColor: THEME.colors.border + '60',
    },
    cardImage: {
        width: '100%',
        height: 200, // Daha büyük görsel
        resizeMode: 'cover',
    },
    cardContent: {
        padding: THEME.spacing.lg, // Daha nefes alan iç boşluk
    },
    cardTitle: {
        ...THEME.typography.title,
        fontSize: 22,
        marginBottom: THEME.spacing.xs,
    },
    cardDesc: {
        ...THEME.typography.caption,
        fontSize: 15,
        color: THEME.colors.textLight,
        marginBottom: THEME.spacing.md,
        lineHeight: 22,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.background,
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: 6,
        borderRadius: THEME.borderRadius.md,
        marginRight: THEME.spacing.sm,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.colors.textLight,
        marginLeft: 4,
    },
    bottomSpace: {
        height: 40,
    }
});
