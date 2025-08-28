import React, { useState, useCallback, memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Play, Star, Plus, Download, Info } from 'lucide-react-native';
import { Shows } from '../../../packages/api/src/types/show';

interface InteractiveShowCardProps {
  show: Shows;
  onPress: (showId: string) => void;
  width?: number;
  viewMode?: 'grid' | 'list';
}

/**
 * Enhanced interactive card with improved accessibility and visual feedback
 * Modern design with better touch targets and micro-interactions
 */
const InteractiveShowCard = memo(
  ({ show, onPress, width = 150, viewMode = 'grid' }: InteractiveShowCardProps) => {
    const [isPressed, setIsPressed] = useState(false);
    const [scaleAnim] = useState(new Animated.Value(1));
    const [opacityAnim] = useState(new Animated.Value(1));
    const [isLiked, setIsLiked] = useState(false);

    const handlePressIn = useCallback(() => {
      setIsPressed(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.97,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, [scaleAnim, opacityAnim]);

    const handlePressOut = useCallback(() => {
      setIsPressed(false);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, [scaleAnim, opacityAnim]);

    const handleLikePress = useCallback(() => {
      setIsLiked(!isLiked);
    }, [isLiked]);

    if (viewMode === 'list') {
      return (
        <Animated.View
          style={[
            styles.listContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}>
          <TouchableOpacity
            style={styles.listCard}
            onPress={() => onPress(show.id)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}>
            <View style={styles.listImageContainer}>
              <Image
                source={{ uri: show.images[0].url }}
                style={styles.listPoster}
                resizeMode="cover"
              />
              <View style={styles.listImageOverlay}>
                <TouchableOpacity style={styles.listPlayButton}>
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listContent}>
              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{show.name}</Text>
                <View style={styles.listRating}>
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{show.score}</Text>
                </View>
              </View>
              <View style={styles.listGenres}>
                <Text style={styles.genreTag}>Drama</Text>
                <Text style={styles.genreTag}>2023</Text>
              </View>
              <Text style={styles.listSynopsis} numberOfLines={2}>
                {show.description}
              </Text>
              <View style={styles.listActions}>
                <TouchableOpacity style={styles.quickAction}>
                  <Play size={16} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <Plus size={16} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <Download size={16} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickAction, isLiked && styles.likedAction]}
                  onPress={handleLikePress}>
                  <Star
                    size={16}
                    color={isLiked ? '#FFD700' : '#8B5CF6'}
                    fill={isLiked ? '#FFD700' : 'none'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.container,
          { width },
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}>
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={() => onPress(show.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}>
          <View style={styles.posterContainer}>
            <Image source={{ uri: show.images[0].url }} style={styles.poster} resizeMode="cover" />

            {/* Overlay con gradiente y efectos */}
            <View style={styles.overlay}>
              <View style={styles.topActions}>
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.rating}>{show.score}</Text>
                </View>
                <View style={styles.qualityBadge}>
                  <Text style={styles.qualityText}>HD</Text>
                </View>
              </View>

              <View style={styles.centerAction}>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <Plus size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Info size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Download size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionIcon, isLiked && styles.likedIcon]}
                  onPress={handleLikePress}>
                  <Star size={16} color="#FFFFFF" fill={isLiked ? '#FFD700' : 'none'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Efecto de brillo en hover */}
            {isPressed && (
              <View style={styles.glowEffect}>
                <View style={styles.innerGlow} />
              </View>
            )}
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {show.name}
            </Text>
            <View style={styles.metadata}>
              <View style={styles.genreContainer}>
                <Text style={styles.genre}>Drama</Text>
              </View>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.year}>2023</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.episodes}>{show.num_seasons} ep</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

InteractiveShowCard.displayName = 'InteractiveShowCard';

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginBottom: 16,
  },
  cardWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 16,
  },
  posterContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 240, // Aumentado de 200 a 240 para mejor proporción
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 16,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rating: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  qualityBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  qualityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  centerAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  likedIcon: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  glowEffect: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 23,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'rgba(139, 92, 246, 0.8)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 16,
  },
  innerGlow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18, // Aumentado de 16 a 18
    fontWeight: '800',
    lineHeight: 24, // Aumentado de 22 a 24
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  genreContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  genre: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  separator: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginHorizontal: 6,
  },
  year: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
  },
  episodes: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  // List view styles
  listContainer: {
    marginBottom: 16,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  listImageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  listPoster: {
    width: 90,
    height: 135,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  listImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  listContent: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    flex: 1,
    marginRight: 16,
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  },
  listGenres: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  genreTag: {
    color: '#8B5CF6',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  listSynopsis: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '500',
  },
  listActions: {
    flexDirection: 'row',
    gap: 16,
  },
  quickAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  likedAction: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
});

export default InteractiveShowCard;
