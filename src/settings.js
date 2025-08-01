// src/settings.js

export class Settings {
  static points = 0;
  static level = 1;
  static lives = 3;
  static record = 20000;

  static getPoints() {
    return Settings.points;
  }

  static getLevel() {
    return Settings.level;
  }

  static getLives() {
    return Settings.lives;
  }

  static getRecord() {
    return Settings.record;
  }

  static setPoints(value) {
    Settings.points = value;
  }

  static setLevel(value) {
    Settings.level = value;
  }

  static setLives(value) {
    Settings.lives = value;
  }

  static setRecord(value) {
    Settings.record = value;
  }
}
