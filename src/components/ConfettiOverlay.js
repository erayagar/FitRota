import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function ConfettiOverlay({ isVisible, onAnimationFinish }) {
    const animationRef = useRef(null);

    useEffect(() => {
        if (isVisible && animationRef.current) {
            animationRef.current.play();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <View style={styles.container} pointerEvents="none">
            <LottieView
                ref={animationRef}
                // Uzak bir Lottie JSON url'si kullanıyoruz (gerçek konfeti animasyonu)
                source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_u4yrau.json' }}
                autoPlay={true}
                loop={false}
                onAnimationFinish={onAnimationFinish}
                style={styles.lottie}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 999, // Ekranın en üstünde olmalı
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: '100%',
        height: '100%',
    }
});
