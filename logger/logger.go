package logger

import (
	"github.com/sirupsen/logrus"
)

type Logger struct {
	instance *logrus.Logger
}

func InitLogger() *Logger {
	log := logrus.New()
	log.SetFormatter(&logrus.TextFormatter{
		FullTimestamp:   true,
		TimestampFormat: "2006-01-02 15:04:05",
	})
	log.SetLevel(logrus.InfoLevel)
	return &Logger{instance: log}
}

func (l *Logger) LogInfo(msg string) {
	l.instance.Info(msg)
}

func (l *Logger) LogError(msg string) {
	l.instance.Error(msg)
}

func (l *Logger) LogFatal(msg string) {
	l.instance.Fatal(msg)
}

func (l *Logger) LogWarn(msg string) {
	l.instance.Warn(msg)
}

func (l *Logger) LogDebug(msg string) {
	l.instance.Debug(msg)
}
