import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Clock, Flame, Info, CheckCircle2 } from 'lucide-react-native';
import { THEME } from '../constants/theme';

const { height } = Dimensions.get('window');

// Yapay Zeka (AI) destekli Yüksek Kaliteli Yerel (Local) assets görselleri
const DETAIL_DATA = {
    diets: {
        d1: {
            title: 'Aralıklı Oruç (16:8)',
            type: 'Diyet Planı',
            image: require('../../assets/images/content/diet2.png'),
            stats: [
                { label: 'Kalori', value: '1500 kcal', icon: <Flame size={20} color={THEME.colors.danger} /> },
                { label: 'Süre', value: '14 Gün', icon: <Clock size={20} color={THEME.colors.textLight} /> }
            ],
            content: 'Aralıklı oruç (Intermittent Fasting), ne yediğinize değil, ne zaman yediğinize odaklanan bir beslenme düzenidir. 16:8 yöntemi, günün 16 saati oruç tutup kalan 8 saatlik pencerede yemek yemeyi kapsar.\n\nFaydaları:\n• İnsülin direncini kırar.\n• Hücre yenilenmesini (Otofaji) tetikler.\n• Yağ yakımını hızlandırır.\n\nÖrnek Menü (12:00 - 20:00):\n1. 12:00 Peynirli Omlet ve Yeşillik\n2. 16:00 Çiğ Badem ve Şekersiz Kahve\n3. 19:30 Izgara Somon ve Buharda Brokoli'
        },
        d2: {
            title: 'Yüksek Protein Menüsü',
            type: 'Diyet Planı',
            image: require('../../assets/images/content/diet2.png'),
            stats: [
                { label: 'Kalori', value: '2200 kcal', icon: <Flame size={20} color={THEME.colors.danger} /> },
                { label: 'Süre', value: '30 Gün', icon: <Clock size={20} color={THEME.colors.textLight} /> }
            ],
            content: 'Kas gelişimi ve onarımı için yüksek protein içeren doyurucu bir diyet programıdır.\n\nTemel Besinler:\n• Yumurta ve Lor Peyniri\n• Tavuk Göğsü, Hindi ve Sığır Eti\n• Yeşil Mercimek, Nohut\n\nNot: Bol su tüketimi böbrek sağlığı için şarttır.'
        }
    },
    exercises: {
        e1: {
            title: 'Evde Tüm Vücut',
            type: 'Antrenman',
            image: require('../../assets/images/content/workout1.png'),
            stats: [
                { label: 'Süre', value: '25 dk', icon: <Clock size={20} color={THEME.colors.textLight} /> },
                { label: 'Yakım', value: '300 kcal', icon: <Flame size={20} color={THEME.colors.danger} /> }
            ],
            content: 'Herhangi bir ekipmana ihtiyaç duymadan, sadece vücut ağırlığınızla yapabileceğiniz yüksek tempolu (HIIT) yağ yakım antrenmanı.\n\nHareketler (3 Set):\n1. Jumping Jacks (45 saniye)\n2. Şınav (10 tekrar)\n3. Squat (15 tekrar)\n4. Plank (30 saniye)\n5. Mountain Climbers (40 saniye)\n\nSetler arası 60 saniye dinlenin.'
        },
        e2: {
            title: 'Rahatlatıcı Yoga Akışı',
            type: 'Antrenman (Esneme)',
            image: require('../../assets/images/content/yoga1.png'),
            stats: [
                { label: 'Süre', value: '40 dk', icon: <Clock size={20} color={THEME.colors.textLight} /> },
                { label: 'Yakım', value: '150 kcal', icon: <Flame size={20} color={THEME.colors.danger} /> }
            ],
            content: 'Günün stresini atmak ve bedeninizi rahatlatmak için tasarlanmış başlangıç seviyesi yoga akışı.\n\nTemel Pozlar:\n• Aşağı Bakan Köpek (1dk)\n• Çocuk Pozu (2dk)\n• Kobra Pozu (5 Nefes)\n• Savaşçı 2 (Her iki taraf için 1dk)\n\nSadece burnunuzdan derin nefesler alıp verin.'
        }
    },
    blogs: {
        b1: {
            title: 'Suyun Vücuda 5 Mucizevi Etkisi',
            type: 'Makale',
            image: require('../../assets/images/content/water1.png'),
            stats: [
                { label: 'Okuma Süresi', value: '3 dk', icon: <Clock size={20} color={THEME.colors.textLight} /> },
                { label: 'Kategori', value: 'Sağlık', icon: <Info size={20} color={THEME.colors.secondary} /> }
            ],
            content: [
                { type: 'text', text: 'Su, insan vücudunun %60’ını oluşturur ve her bir hücremizin hayatta kalması için elzemdir. Yeterli su içmenin faydaları saymakla bitmez.\n\n1. Metabolizmayı Hızlandırır:\nSabah aç karnına içilen 1 bardak ılık su, metabolizma hızını %24\'e kadar artırabilir.' },
                { type: 'image', uri: require('../../assets/images/content/water1.png') },
                { type: 'text', text: '2. Cilt Sağlığını Korur:\nYeterli hidrasyon, cildin esnekliğini artırır ve yaşlanma belirtilerini geciktirir.\n\n3. Toksinleri Atar:\nBöbreklerin kanı temizlemesi için bol suya ihtiyacı vardır.\n\n4. Baş Ağrısını Önler:\nÇoğu baş ağrısının temel sebebi susuzluktur (Dehidrasyon).\n\n5. Egzersiz Performansını Artırır:\nKaslardaki sıvı dengesi korunduğunda kramplar önlenir ve dayanıklılık artar.' }
            ]
        },
        b2: {
            title: 'Şekeri Bırakmanın Yolları',
            type: 'Makale',
            image: require('../../assets/images/content/sugar1.png'),
            stats: [
                { label: 'Okuma Süresi', value: '5 dk', icon: <Clock size={20} color={THEME.colors.textLight} /> },
                { label: 'Kategori', value: 'Beslenme', icon: <Info size={20} color={THEME.colors.secondary} /> }
            ],
            content: [
                { type: 'text', text: 'İşlenmiş şeker modern çağın en büyük sağlık sorunlarından biridir. Peki bu bağımlılıktan nasıl kurtulabiliriz?\n\nÖncelikle Şeker Neden Bağımlılık Yapar?\nŞeker tüketimi beyinde dopamin salgılanmasına neden olur. Bu geçici mutluluk hissi, kan şekeri düştüğünde yerini ani bir açlık ve tatlı krizine bırakır.' },
                { type: 'image', uri: require('../../assets/images/content/sugar1.png') },
                { type: 'text', text: 'Nasıl Bırakılır?\n• Etiket Okuyun: Aldığınız ürünlerin arkasını mutlaka okuyun.\n• Yapay Tatlandırıcılardan Uzak Durun: O da beyni kandırır.\n• Bol Su İçin: Susuzluk çoğu zaman açlık veya şeker krizi ile karıştırılır.\n• Meyve Tüketin: Tatlı ihtiyacınızı elma veya tarçınlı yoğurt ile bastırın.' }
            ]
        }
    }
};

export default function ArticleDetailScreen({ route, navigation }) {
    const { type, id } = route.params;

    // Gelen parametreye göre datayı seçiyoruz.
    const data = DETAIL_DATA[type]?.[id];

    if (!data) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>İçerik Bulunamadı.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header Image Katmanı */}
                <View style={styles.imageContainer}>
                    <Image source={typeof data.image === 'string' ? { uri: data.image } : data.image} style={styles.headerImage} />

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeft color={THEME.colors.text} size={24} />
                    </TouchableOpacity>
                </View>

                {/* İçerik Katmanı */}
                <View style={styles.contentContainer}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{data.type}</Text>
                    </View>

                    <Text style={styles.title}>{data.title}</Text>

                    {/* İstatistikler */}
                    <View style={styles.statsRow}>
                        {data.stats.map((stat, idx) => (
                            <View key={idx} style={styles.statBox}>
                                {stat.icon}
                                <View style={styles.statTexts}>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    {/* Yazı Metni */}
                    {Array.isArray(data.content) ? (
                        data.content.map((block, index) => {
                            if (block.type === 'text') {
                                return <Text key={index} style={styles.paragraph}>{block.text}</Text>;
                            } else if (block.type === 'image') {
                                return (
                                    <Image
                                        key={index}
                                        source={typeof block.uri === 'string' ? { uri: block.uri } : block.uri}
                                        style={styles.contentImage}
                                    />
                                );
                            }
                            return null;
                        })
                    ) : (
                        <Text style={styles.paragraph}>{data.content}</Text>
                    )}

                    {type !== 'blogs' && (
                        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                            <CheckCircle2 color={THEME.colors.surface} size={20} />
                            <Text style={styles.buttonText}>Hedeflerime Ekle</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.bottomSpacer} />
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
    imageContainer: {
        position: 'relative',
        height: height * 0.4,
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: THEME.spacing.lg,
        backgroundColor: 'rgba(255,255,255,0.95)',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        ...THEME.shadows.soft,
    },
    contentContainer: {
        backgroundColor: THEME.colors.background,
        borderTopLeftRadius: THEME.spacing.xl,
        borderTopRightRadius: THEME.spacing.xl,
        marginTop: -30,
        padding: THEME.spacing.lg,
        paddingTop: THEME.spacing.xl,
        minHeight: height * 0.6,
    },
    categoryBadge: {
        backgroundColor: THEME.colors.primaryLight,
        alignSelf: 'flex-start',
        paddingHorizontal: THEME.spacing.sm,
        paddingVertical: THEME.spacing.xs,
        borderRadius: THEME.borderRadius.sm,
        marginBottom: THEME.spacing.sm,
    },
    categoryText: {
        color: THEME.colors.primary,
        fontWeight: 'bold',
        fontSize: 12,
    },
    title: {
        ...THEME.typography.header,
        fontSize: 32,
        marginBottom: THEME.spacing.lg,
        lineHeight: 38,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: THEME.spacing.lg,
    },
    statBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.surface,
        padding: THEME.spacing.lg,
        borderRadius: THEME.borderRadius.lg,
        marginRight: THEME.spacing.md,
        flex: 1,
        ...THEME.shadows.soft,
        borderWidth: 1,
        borderColor: THEME.colors.border + '50',
    },
    statTexts: {
        marginLeft: THEME.spacing.sm,
    },
    statLabel: {
        ...THEME.typography.caption,
    },
    statValue: {
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: THEME.colors.border,
        marginBottom: THEME.spacing.lg,
    },
    paragraph: {
        ...THEME.typography.body,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: THEME.spacing.md,
        color: THEME.colors.text,
    },
    contentImage: {
        width: '100%',
        height: 200,
        borderRadius: THEME.borderRadius.md,
        marginVertical: THEME.spacing.md,
        resizeMode: 'cover',
    },
    inlineImage: {
        width: '100%',
        height: 200,
        borderRadius: THEME.borderRadius.md,
        marginBottom: THEME.spacing.xl,
        resizeMode: 'cover',
    },
    primaryButton: {
        backgroundColor: THEME.colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: THEME.spacing.xl,
        borderRadius: THEME.borderRadius.lg,
        ...THEME.shadows.soft,
        marginTop: THEME.spacing.md,
    },
    buttonText: {
        color: THEME.colors.surface,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: THEME.spacing.sm,
    },
    bottomSpacer: {
        height: 80,
    }
});
