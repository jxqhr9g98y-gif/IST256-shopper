import { Injectable } from '@angular/core';
import restaurantsData from '../../assets/restaurants.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private FAVORITES_KEY = 'dineFinder.favorites';
  private NOTES_KEY = 'dineFinder.notes';
  private CUSTOM_KEY = 'dineFinder.customRestaurants';

  constructor() {}

  // LOAD ALL RESTAURANTS
  loadAll() {
    const custom = this.getCustomRestaurants();
    return [...restaurantsData, ...custom];
  }

  getById(id: number) {
    return this.loadAll().find(r => r.id === id);
  }

  // FAVORITES
  getFavorites(): number[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  addFavorite(id: number) {
    const favs = this.getFavorites();
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    }
  }

  removeFavorite(id: number) {
    const updated = this.getFavorites().filter(f => f !== id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updated));
  }

  toggleFavorite(id: number) {
    this.isFavorite(id) ? this.removeFavorite(id) : this.addFavorite(id);
  }

  // NOTES
  getNote(id: number): string {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    return notes[id] || '';
  }

  saveNote(id: number, text: string) {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    notes[id] = text;
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  deleteNote(id: number) {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    delete notes[id];
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  // CUSTOM RESTAURANTS
  getCustomRestaurants() {
    return JSON.parse(localStorage.getItem(this.CUSTOM_KEY) || '[]');
  }

  saveCustomRestaurant(restaurant: any) {
    const custom = this.getCustomRestaurants();
    restaurant.id = Date.now(); // unique ID
    custom.push(restaurant);
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(custom));
  }

  deleteCustomRestaurant(id: number) {
    const updated = this.getCustomRestaurants().filter(r => r.id !== id);
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(updated));
  }
}
